const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Preferencias = sequelize.define('Preferencias', {
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
    }
},{
    timestamps: true,
});

module.exports = Preferencias;

