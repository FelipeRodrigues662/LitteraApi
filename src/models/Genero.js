const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const { isMobilePhone } = require('validator');
const { type } = require('os');

const Genero = sequelize.define('Genero', {
    id: {
        type: DataTypes.Integer,
        defaultValue: DataTypes.Integer,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    }
}
);

module.exports = Genero;

