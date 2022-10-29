'use strict'
const {Sequelize, DataTypes} = require('sequelize');
const customerTable = require('./customer');
const alertTable = require('./alert');
const wbgtTable = require('./wgbt');
require('dotenv').config();
let DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';
const DATABASE_CONFIG = process.env.NODE_ENV === 'production'
? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelizeInstance = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const Customer = customerTable(sequelizeInstance, DataTypes);
const Alert = alertTable(sequelizeInstance, DataTypes);
const Wbgt = wbgtTable(sequelizeInstance, DataTypes);

Customer.hasMany(Alert, {
  as: 'alert'
});
Customer.hasMany(Wbgt, {
  as: 'wbgt'
});
Alert.belongsTo(Customer, {
  foreignKey: 'customerId',
  as: 'customer'
});
Wbgt.belongsTo(Customer,{
  foreignKey: 'customerId',
  as: 'customer'
});

module.exports = {
  db: sequelizeInstance,
  Customer,
  Alert,
  Wbgt
}