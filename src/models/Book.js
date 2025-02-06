const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const TypeTransaction = require('./TypeTransaction.js');
const StatusBook = require('./StatusBook.js');
const User = require('./User.js')

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
    TypeTransactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeTransaction,
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
    value: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
            isDecimal: true
        }
    },
    ownerBook:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,  
    },
    cidade:{
        type: DataTypes.STRING,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
