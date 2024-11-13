// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db'); // Import Sequelize instance

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

// Connect to Database and Sync Models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    return sequelize.sync(); // Sync models with the database
  })
  .then(() => {
    console.log('Database synced successfully.');
    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database or sync models:', err);
  });