const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Book = require('./Book.js');
const User = require('./User.js');

const Interesses = sequelize.define('Interesses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    BookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
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

module.exports = Interesses;
