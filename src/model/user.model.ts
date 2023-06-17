const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER, process.env.MYSQL_PASSWORD, {
    host: process.env.HOST,
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