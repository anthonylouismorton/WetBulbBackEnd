'use strict'

const User = (sequelizeInstance, DataTypes) => sequelizeInstance.define(
  'user',{
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userEmail: {
      type: DataTypes.STRING,
    }
  },
  {
    underscore: false, timestamps: false
  }
)

module.exports = User