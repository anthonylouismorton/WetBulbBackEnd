'use strict'
const {Sequelize, DataTypes} = require('sequelize');
const userTable= require('./user');
const alertTable = require('./alert');
const alertEmailTable = require('./alertEmail');
const wbgtTable = require('./wbgt');
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
const AlertEmail = alertEmailTable(sequelizeInstance, DataTypes);
const Wbgt = wbgtTable(sequelizeInstance, DataTypes);

User.hasMany(Alert, {
  as: 'alert'
});
User.hasMany(Wbgt, {
  as: 'wbgt'
});
Alert.hasMany(AlertEmail, {
  as: 'alertemail'
})
Alert.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});
Wbgt.belongsTo(Alert,{
  foreignKey: 'alertId',
  as: 'alert'
});
AlertEmail.belongsTo(Alert, {
  foreignKey: 'alertId',
  as: 'alert'
})

module.exports = {
  db: sequelizeInstance,
  User,
  Alert,
  AlertEmail,
  Wbgt
}