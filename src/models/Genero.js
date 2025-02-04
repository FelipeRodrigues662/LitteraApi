const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Genero = sequelize.define('Genero', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Genero;
