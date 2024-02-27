const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database")
const User = require("./User")
const Player = require("./Player")
const UserSquad = require("./UserSquad")

const UserTransfers = sequelize.define('UserTransfers', {
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
    // playerInId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: Player,
    //         key: 'id'
    //     }
    
    // },
    // playerOutId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: Player,
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



module.exports = UserTransfers;


