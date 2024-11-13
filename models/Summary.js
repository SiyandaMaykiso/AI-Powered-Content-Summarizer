const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // Import the User model to establish relationships

const Summary = sequelize.define('Summary', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Establish a relationship: each summary belongs to a user
Summary.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Summary, { foreignKey: 'userId', as: 'summaries' });

module.exports = Summary;