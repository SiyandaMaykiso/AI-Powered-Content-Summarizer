const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Set to 'console.log' for debugging SQL queries
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false,
  },
});

// Verify database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1); // Exit the process with failure code
  });

module.exports = sequelize;