const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    ExternalId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    device_token: {
        type: DataTypes.STRING,
        allowNull: true
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
}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        },
        {
            unique: true,
            fields: ['cpf']
        },
        {
            fields: ['phone']
        }
    ]
});

User.updateLastLogin = async (userId) => {
    try {
        await User.update(
            { last_login: new Date() },
            { where: { id: userId } }
        );
    } catch (error) {
        console.error('Error updating last login:', error);
        throw error;
    }
};

module.exports = User;