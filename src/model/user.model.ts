const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('sb_erp_api', 'console_dot', 'hEllo@911', {
    host: 'db4free.net',
    dialect: 'mysql'
  });

// Define the User model
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Create the User table in the database (if it doesn't exist)
// User.sync().then(() => {
//     console.log('User table created');
// });

export {User};