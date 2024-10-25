const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
  resetToken: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: true,
});

module.exports = User;
