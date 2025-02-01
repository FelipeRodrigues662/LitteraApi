const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const TypeTransaction = sequelize.define('TypeTransaction', {
    id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
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
}
);

module.exports = TypeTransaction;

