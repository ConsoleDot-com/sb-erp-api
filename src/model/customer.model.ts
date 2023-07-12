const { ApolloServer, gql } = require('apollo-server-express');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER, process.env.MYSQL_PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql'
});

const Customer = sequelize.define('customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  houseNo: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    primaryKey: true,
  }
});



Customer.sync()
  .then(() => {
    console.log('Customers table created successfully');
  })
  .catch((error) => {
    console.error('Error creating Customers table:', error);
  });
