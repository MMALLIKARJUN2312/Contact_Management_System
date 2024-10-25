const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./db'); // Ensure this points to your database connection

const Otp = sequelize.define('Otp', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiry: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Otp.sync();

module.exports = Otp;
