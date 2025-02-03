const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const user = require('./User.js');
const genero = require('./Genero.js'); 

const Preferencias = sequelize.define('Preferencias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    },
    GeneroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: genero,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

module.exports = Preferencias;