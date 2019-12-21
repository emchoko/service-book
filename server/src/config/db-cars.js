const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.DATABASE_CAR, process.env.DB_USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    define: {
      timestamps: false,
      underscored: true,
    },
  });

connection
  .authenticate()
  .then(() => {
    console.log('Connection was successful to CarDB');
  })
  .catch((err) => {
    console.log('Unable to establish connection to CarDB!', err.message);
  });

const db = {};
db.connection = connection;
db.DataTypes = Sequelize;

db.auto_databases_one = require('../model/auto_databases_one')(connection, Sequelize);


module.exports = db;
