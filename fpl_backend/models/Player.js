const { DataTypes, Sequelize } = require('sequelize');
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
        allowNull: true
    },
    selected_by_percent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    now_cost: { // e.g. 55 = £5.5m
        type: DataTypes.INTEGER,
        allowNull: true
    },
    news:{
        type: DataTypes.STRING,
        allowNull: true
    },
    news_added:{
        type: DataTypes.STRING,
        allowNull: true
    },
    fpl_id:{ // id from FPL API
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
    squad_number:{
        type: DataTypes.STRING,
        allowNull: true
    },
    team:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    short_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    club_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    points_per_game:{
        type: DataTypes.STRING,
        allowNull: true
    },
    minutes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    goals_scored: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    assists: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    clean_sheets: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    goals_conceded: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    own_goals: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    penalties_saved: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    penalties_missed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    yellow_cards: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    red_cards: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    threat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    starts: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    expected_goals: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expected_assists: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expected_goal_involvements: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expected_goals_conceded: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expected_goals_per_90: {
        type: DataTypes.STRING,
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


module.exports = Player;


