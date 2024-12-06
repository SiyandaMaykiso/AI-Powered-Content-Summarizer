const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure sequelize is correctly imported
const User = require('./User'); // Import the User model to establish relationships

// Define the Summary model
const Summary = sequelize.define('Summary', {
  // Original content submitted by the user
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // The summarized content
  summary: {
    type: DataTypes.TEXT,
    allowNull: true, // Allow null initially, as the summary might be generated later
  },
  // Timestamps (createdAt and updatedAt) are included by default unless explicitly disabled
});

// Establish relationships between User and Summary
// Each summary belongs to a specific user
Summary.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// A user can have multiple summaries
User.hasMany(Summary, { foreignKey: 'userId', as: 'summaries' });

module.exports = Summary;