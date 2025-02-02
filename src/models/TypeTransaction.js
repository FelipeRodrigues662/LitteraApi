const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const TypeTransaction = sequelize.define('TypeTransaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
    
},{
    timestamps: true,
});

module.exports = TypeTransaction;

