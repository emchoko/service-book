const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.DATABASE, process.env.DB_USERNAME, process.env.PASSWORD, {
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
    console.log('Connection was successful');
  })
  .catch((err) => {
    console.log('Unable to establish connection!', err.message);
  });

const db = {};
db.connection = connection;
db.DataTypes = Sequelize;

// Wire the models here with the db object
db.clients = require('../model/client')(connection, Sequelize);
db.clientCars = require('../model/client_car')(connection, Sequelize);
db.internalCars = require('../model/internal_car')(connection, Sequelize);
db.services = require('../model/service')(connection, Sequelize);
db.products = require('../model/product')(connection, Sequelize);
db.produc

// Define associations
db.clients.hasMany(db.clientCars);
db.clientCars.belongsTo(db.clients, { as: 'client' });

db.internalCars.hasMany(db.clientCars);
db.clientCars.belongsTo(db.internalCars, { as: 'internalCar' });

db.clientCars.hasMany(db.services);
db.services.belongsTo(db.clientCars, { as: 'clientCar' });

db.services.belongsToMany(db.products, {through: 'service_product'});
db.products.belongsToMany(db.services, {through: 'service_product'});

module.exports = db;
