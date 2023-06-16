const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('sb_erp_api', 'console_dot', 'hEllo@911', {
    host: 'db4free.net',
    dialect: 'mysql'
  });

// Define the User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Create the User table in the database (if it doesn't exist)
// User.sync().then(() => {
//     console.log('User table created');
// });

export {User};