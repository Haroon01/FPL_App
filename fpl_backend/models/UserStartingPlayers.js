const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database")
const User = require("./User")
const Player = require("./Player")
const UserSquad = require("./UserSquad")

// Keeps a track of which player is benched on a users squad. 
const UserStartingPlayers = sequelize.define('UserStartingPlayers', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: User,
    //         key: 'id'
    //     }
    // },
    // userSquadId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: UserSquad,
    //         key: 'id'
    //     }
    // }, 
    playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Player,
            key: 'id'
        }
    },
    isBenched: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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



module.exports = UserStartingPlayers;


