const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

class OTP extends Model {}

OTP.init({
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
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        onUpdate: DataTypes.NOW,
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'OTP',
    timestamps: false,
});

module.exports = OTP;
