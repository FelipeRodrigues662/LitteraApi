const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

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
        allowNull: false
    },
    GeneroId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    StatusBookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Book;