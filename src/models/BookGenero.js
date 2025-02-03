const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Book = require('./Book.js');
const Genero = require('./Genero.js');

const BookGenero = sequelize.define('BookGenero', {
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
    GeneroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genero,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

module.exports = BookGenero;
