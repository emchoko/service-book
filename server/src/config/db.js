const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  define: {
    timestamps: false,
  },
});

sequelize
    .authenticate()
    .then(() => {
      console.log('Connection was successful');
    })
    .catch((err) => {
      console.log('Unable to establish connection!', err.message);
    });

const db = {};
db.connection = sequelize;
db.types = Sequelize;

module.exports = db;
