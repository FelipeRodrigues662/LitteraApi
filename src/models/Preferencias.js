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
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: sequelize.literal('CURRENT_TIMESTAMP')
    }
});

Preferencias.belongsTo(genero, { foreignKey: 'GeneroId' });
Preferencias.belongsTo(user, { foreignKey: 'UserId' });

module.exports = Preferencias;