'use strict'

const Alert = (sequelizeInstance, DataTypes) => sequelizeInstance.define(
  'alert',{
    alertId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    frequency: {
      type: DataTypes.STRING,
    },
    customerEmail: {
      type: DataTypes.STRING,
    }
  },
  {
    underscore: false, timestamps: false
  }
)

module.exports = Alert