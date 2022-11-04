'use strict'

const AlertEmail = (sequelizeInstance, DataTypes) => sequelizeInstance.define(
  'alertemail',{
    alertEmailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    alertEmail: {
      type: DataTypes.STRING,
    }
  },
  {
    underscore: false, timestamps: false
  }
)

module.exports = AlertEmail