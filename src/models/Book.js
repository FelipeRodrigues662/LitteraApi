const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const TypeTransaction = require('./TypeTransaction.js')
const Genero = require("./Genero.js")
const StatusBook = require("./StatusBook.js")

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    nome: { 
        type: DataTypes.STRING(50), 
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    TypeTrasactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeTransaction,
            key: 'id'
        }
    },
    GeneroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genero,
            key: 'id'
        }
    },
    StatusBookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: StatusBook,
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

module.exports = Book;