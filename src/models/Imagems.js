const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Book = require('./Book.js');

const Imagens = sequelize.define('Imagens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fileName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    fileContent: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },    
    fileType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    BookId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Book,
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

module.exports = Imagens;

