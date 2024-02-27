const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database")
const User = require("./User")
const Player = require("./Player")

// Holds the users squad.
const UserSquad = sequelize.define('UserSquad', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    // player FKs are all defined in Player.js model
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

//UserSquad.hasOne(User);

// the below have been moved to ./Player.js
// UserSquad.hasOne(Player, { foreignKey: 'gk1_id' });
// UserSquad.hasOne(Player, { foreignKey: 'gk2_id' });
// UserSquad.hasOne(Player, { foreignKey: 'def1_id' });
// UserSquad.hasOne(Player, { foreignKey: 'def2_id' });
// UserSquad.hasOne(Player, { foreignKey: 'def3_id' });
// UserSquad.hasOne(Player, { foreignKey: 'def4_id' });
// UserSquad.hasOne(Player, { foreignKey: 'def5_id' });
// UserSquad.hasOne(Player, { foreignKey: 'mid1_id' });
// UserSquad.hasOne(Player, { foreignKey: 'mid2_id' });
// UserSquad.hasOne(Player, { foreignKey: 'mid3_id' });
// UserSquad.hasOne(Player, { foreignKey: 'mid4_id' });
// UserSquad.hasOne(Player, { foreignKey: 'mid5_id' });
// UserSquad.hasOne(Player, { foreignKey: 'fw1_id' });
// UserSquad.hasOne(Player, { foreignKey: 'fw2_id' });
// UserSquad.hasOne(Player, { foreignKey: 'fw3_id' });


module.exports = UserSquad;


