'use strict'

const Wgbt = (sequelizeInstance, DataTypes) => sequelizeInstance.define(
  'wgbt',{
    wgbtId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    directWGBT: {
      type: DataTypes.STRING,
    },
    shadedWGBT: {
      type: DataTypes.STRING,
    },
    heatIndex: {
      type: DataTypes.STRING,
    },
    solarRadiance: {
      type: DataTypes.STRING,
    },
    barometer: {
      type: DataTypes.STRING,
    },
    dryTemp: {
      type: DataTypes.STRING,
    },
    windspeed: {
      type: DataTypes.STRING,
    },
  },
  {
    underscore: false, timestamps: false
  }
)

module.exports = Wgbt