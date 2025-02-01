const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Adicionado para gerar IDs automaticamente
        allowNull: false,
        primaryKey: true
    },
    nome: { // Alterado de 'name' para 'nome' para corresponder à descrição
        type: DataTypes.STRING(50), // Limitado a 50 caracteres
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