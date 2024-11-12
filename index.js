// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./config/db'); // Import Sequelize instance

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Import Routes
const authRoutes = require('./routes/authRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/summary', summaryRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the AI-Powered Content Summarizer API');
});

// Connect to Database and Start Server
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });