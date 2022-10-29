'use strict'

const Customer = (sequelizeInstance, DataTypes) => sequelizeInstance.define(
  'customer',{
    customerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customerEmail: {
      type: DataTypes.STRING,
    }
  },
  {
    underscore: false, timestamps: false
  }
)

module.exports = Customer