const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Configure Sequelize with the database URL from the .env file
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Set to 'console.log' for debugging SQL queries
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
  }
});

// Export the Sequelize instance for use in other parts of the application
module.exports = { sequelize };