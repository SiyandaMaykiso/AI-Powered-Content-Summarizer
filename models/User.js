const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the sequelize instance directly

const User = sequelize.define('User', { // Use the sequelize instance to define the model
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;