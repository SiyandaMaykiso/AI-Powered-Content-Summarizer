const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middlewares/authMiddleware');
const Summary = require('./models/Summary');
const User = require('./models/User');
const sequelize = require('./config/db'); // Ensure the correct import
const axios = require('axios');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Static File Serving
app.use(express.static(path.join(__dirname, 'client/build')));

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the AI-Powered Content Summarizer API!');
});

// Summarization Route
app.post('/api/summarize', authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required for summarization.' });
        }

        // Call OpenAI API for summarization
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a professional text summarizer.' },
                    { role: 'user', content: `Summarize this content in a concise and clear way:\n\n${content}` },
                ],
                max_tokens: 200,
                temperature: 0.5,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const summary = response.data.choices[0].message.content.trim();

        // Save the summary to the database
        await Summary.create({
            userId: req.user.id,
            content,
            summary,
        });

        res.json({ summary });
    } catch (error) {
        console.error('Error summarizing content:', error.message);
        res.status(500).json({ error: 'Failed to summarize content' });
    }
});

// Summary History Route
app.get('/api/summaryhistory', authMiddleware, async (req, res) => {
    try {
        const summaries = await Summary.findAll({ where: { userId: req.user.id } });
        res.json({ summaryHistory: summaries });
    } catch (error) {
        console.error('Error fetching summary history:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching summary history' });
    }
});

// Handle All Other Routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Sync Database and Start Server
sequelize
    .authenticate() // Verify connection to the database
    .then(() => {
        console.log('Database connected successfully.');
        return sequelize.sync({ force: false }); // Sync models
    })
    .then(() => {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database or sync models:', err.message);
    });