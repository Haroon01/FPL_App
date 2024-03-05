const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database")

const Club = sequelize.define('Club', {
    id: {
        allowNull: false,
        //autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    // api_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    code: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    draw: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    form: {
        type: DataTypes.STRING,
        allowNull: true
    },
    team_id: { // id from API
        type: DataTypes.INTEGER,
        allowNull: true
    },
    loss: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    played: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    short_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    strength: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    unavailable: {
        type: DataTypes.STRING,
        allowNull: true
    },
    win: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pulse_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
});

module.exports = Club;

