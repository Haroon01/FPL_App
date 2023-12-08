const { DataTypes } = require('sequelize');
const sequelize = require("../database")

const Player = sequelize.define('Player', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chance_of_playing_next_round: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    chance_of_playing_this_round: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    form: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selected_by_percent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    now_cost: { // e.g. 55 = £5.5m
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // club_id: { // foreign key!
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    }
});

module.exports = Player;


