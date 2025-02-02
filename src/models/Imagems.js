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
        type: DataTypes.BLOB,
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
    }
},{
    timestamps: true,
});

module.exports = Imagens;

