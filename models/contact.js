const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('../models/user'); 

class Contact extends Model {}

Contact.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  timezone: {
    type: DataTypes.STRING,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Contact',
  timestamps: true,
});

module.exports = Contact;
