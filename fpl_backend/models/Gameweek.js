const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database")

const Gameweek = sequelize.define('Gameweek', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    deadline_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_previous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_current: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_next: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
});

module.exports = Gameweek;


