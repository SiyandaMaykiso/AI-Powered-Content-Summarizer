const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const User = require('./User'); 


const Summary = sequelize.define('Summary', {
  
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  
  summary: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  
});



Summary.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Summary, { foreignKey: 'userId', as: 'summaries' });

module.exports = Summary;