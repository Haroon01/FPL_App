const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database")

const Gameweek = sequelize.define('Gameweek', {
    id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
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
    release_time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    average_entry_score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    data_checked: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    highest_scoring_entry: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deadline_time_epoch: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deadline_time_game_offset: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    highest_score:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    is_previous:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_current:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_next:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ranked_count:{
        type: DataTypes.INTEGER,
        allowNull: false
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


module.exports = Gameweek;


