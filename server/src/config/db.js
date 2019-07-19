const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DATABASE, process.env.DB_USERNAME, process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
      define: {
        timestamps: false,
      },
    });

connection
    .authenticate()
    .then(() => {
      console.log('Connection was successful');
    })
    .catch((err) => {
      console.log('Unable to establish connection!', err.message);
    });

const db = {};
db.connection = connection;
db.DataTypes = Sequelize;

db.clients = require('../model/client')(connection, Sequelize);
db.

module.exports = db;
