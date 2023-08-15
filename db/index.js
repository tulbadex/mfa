const Sequelize = require('sequelize');
require('dotenv').config();

// Set up database connection
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Change this based on your database
    logging: false, // Disable query logging
    define: {
      timestamps: false
    }
  }
);

module.exports = sequelize;