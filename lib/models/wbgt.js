'use strict'

const Wbgt = (sequelizeInstance, DataTypes) => sequelizeInstance.define(
  'wbgt',{
    wbgtId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    directWBGT: {
      type: DataTypes.STRING,
    },
    shadedWBGT: {
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
    date: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    }
  },
  {
    underscore: false, timestamps: true
  }
)

module.exports = Wbgt