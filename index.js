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
const summaryController = require('./controllers/summaryController'); 


dotenv.config();


const app = express();


app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL, 
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        credentials: true, 
    })
);
app.use(bodyParser.json());


const authRoutes = require('./routes/authRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/summarize', summaryRoutes);


app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => {
    res.send('Welcome to the AI-Powered Content Summarizer API!');
});


app.post(
    '/api/summarize/file',
    authMiddleware,
    fileUploadMiddleware.single('file'),
    summaryController.summarizeFile
);


app.post('/api/summarize', authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required for summarization.' });
        }

        
        const savedInput = await Summary.create({
            userId: req.user.id,
            content,
            summary: null, 
        });

        
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
                max_tokens: 500,
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

        
        savedInput.summary = summary;
        await savedInput.save();

        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: 'Failed to summarize content' });
    }
});


app.get('/api/summaryhistory', authMiddleware, async (req, res) => {
    try {
        const summaries = await Summary.findAll({ where: { userId: req.user.id } });
        res.json({ summaryHistory: summaries });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching summary history' });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


sequelize
    .authenticate()
    .then(() => sequelize.sync({ force: false }))
    .then(() => {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database or sync models:', err.message);
    });