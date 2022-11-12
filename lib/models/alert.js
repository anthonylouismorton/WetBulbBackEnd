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
    flagCondition: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.STRING
    },
    lon: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    }
  },
  {
    underscore: false, timestamps: false
  }
)

module.exports = Alert