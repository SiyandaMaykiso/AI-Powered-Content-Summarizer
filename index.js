const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authMiddleware = require('./middlewares/authMiddleware');
const fileUploadMiddleware = require('./middlewares/fileUploadMiddleware');
const Summary = require('./models/Summary');
const sequelize = require('./config/db');
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
const summaryRoutes = require('./routes/summaryRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/summarize', summaryRoutes);

// Static File Serving
app.use(express.static(path.join(__dirname, 'client/build')));

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the AI-Powered Content Summarizer API!');
});

// File Upload Route
app.post('/api/summarize', authMiddleware, async (req, res) => {
    console.log('POST /api/summarize route hit'); // Log this to confirm the request is received

    try {
        const { content } = req.body;
        if (!content) {
            console.log('Request is missing content field');
            return res.status(400).json({ error: 'Content is required for summarization.' });
        }

        // Save the input content in the database
        const savedInput = await Summary.create({
            userId: req.user.id,
            content,
            summary: null, // Placeholder until the summary is generated
        });

        // Call OpenAI API for summarization
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional summarizer. Provide clear, concise, and balanced summaries that highlight the main points without unnecessary details.',
                    },
                    {
                        role: 'user',
                        content: `Summarize this content clearly and concisely:\n\n${content}`,
                    },
                ],
                max_tokens: 500, // Allow room for balanced summaries
                temperature: 0.5, // Slightly increased temperature for balance
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        console.log('Raw API Response:', response.data.choices[0].message.content); // Log the raw API response

        // Extract summary
        const summary = response.data.choices[0].message.content.trim();

        // Update the saved input with the generated summary
        savedInput.summary = summary;
        await savedInput.save();

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
    .authenticate()
    .then(() => {
        console.log('Database connected successfully.');
        return sequelize.sync({ force: false });
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