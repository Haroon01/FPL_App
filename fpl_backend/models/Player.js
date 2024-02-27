const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database")
const UserSquad = require("./UserSquad")

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
        allowNull: true
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

// Player.hasMany(UserSquad, { foreignKey: 'gk1_id' });
// Player.hasMany(UserSquad, { foreignKey: 'gk2_id' });
// Player.hasMany(UserSquad, { foreignKey: 'def1_id' });
// Player.hasMany(UserSquad, { foreignKey: 'def2_id' });
// Player.hasMany(UserSquad, { foreignKey: 'def3_id' });
// Player.hasMany(UserSquad, { foreignKey: 'def4_id' });
// Player.hasMany(UserSquad, { foreignKey: 'def5_id' });
// Player.hasMany(UserSquad, { foreignKey: 'mid1_id' });
// Player.hasMany(UserSquad, { foreignKey: 'mid2_id' });
// Player.hasMany(UserSquad, { foreignKey: 'mid3_id' });
// Player.hasMany(UserSquad, { foreignKey: 'mid4_id' });
// Player.hasMany(UserSquad, { foreignKey: 'mid5_id' });
// Player.hasMany(UserSquad, { foreignKey: 'fw1_id' });
// Player.hasMany(UserSquad, { foreignKey: 'fw2_id' });
// Player.hasMany(UserSquad, { foreignKey: 'fw3_id' });

module.exports = Player;


