'use strict'
const {Sequelize, DataTypes} = require('sequelize');
const userTable= require('./user');
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
const User = userTable(sequelizeInstance, DataTypes);
const Alert = alertTable(sequelizeInstance, DataTypes);
const Wbgt = wbgtTable(sequelizeInstance, DataTypes);

User.hasMany(Alert, {
  as: 'alert'
});
User.hasMany(Wbgt, {
  as: 'wbgt'
});
Alert.belongsTo(User, {
  foreignKey: 'customerId',
  as: 'user'
});
Wbgt.belongsTo(User,{
  foreignKey: 'userId',
  as: 'user'
});

module.exports = {
  db: sequelizeInstance,
  User,
  Alert,
  Wbgt
}