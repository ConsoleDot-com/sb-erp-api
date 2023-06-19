const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('sb_erp_api', 'console_dot', 'hEllo@911', {
    host: 'db4free.net',
    dialect: 'mysql'
  });

// Define the User model
const Login = sequelize.define("login", {
  cnic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Create the Login table in the database (if it doesn't exist)
// Login.sync().then(() => {
//     console.log('Login table created');
// });

export {Login};