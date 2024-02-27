const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database")
const User = require("./User")
const Player = require("./Player")
const UserSquad = require("./UserSquad")

const Leagues = sequelize.define('Leagues', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // created_by_user_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: User,
    //         key: 'id'
    //     }
    // }, 
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



module.exports = Leagues;


