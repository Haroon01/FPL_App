const Club = require("./Club")
const Player = require("./Player")
const User = require("./User")
const UserSquad = require("./UserSquad")
const UserStartingPlayers = require("./UserStartingPlayers")
const UserTransfers = require("./UserTransfers")
const Leagues = require("./Leagues")
const LeagueUsers = require("./LeagueUsers")


// User can have one squad, and the squad belongs to that user only.
User.hasOne(UserSquad, { foreignKey: 'userId' });
UserSquad.belongsTo(User, { foreignKey: 'userId' });


// UserSquad can have many players
UserSquad.belongsTo(Player, { foreignKey: 'gk1_id', as: 'gk1'});
UserSquad.belongsTo(Player, { foreignKey: 'gk2_id', as: 'gk2' });
UserSquad.belongsTo(Player, { foreignKey: 'def1_id', as: 'def1' });
UserSquad.belongsTo(Player, { foreignKey: 'def2_id', as: 'def2' });
UserSquad.belongsTo(Player, { foreignKey: 'def3_id', as: 'def3' });
UserSquad.belongsTo(Player, { foreignKey: 'def4_id', as: 'def4' });
UserSquad.belongsTo(Player, { foreignKey: 'def5_id', as: 'def5' });
UserSquad.belongsTo(Player, { foreignKey: 'mid1_id', as: 'mid1' });
UserSquad.belongsTo(Player, { foreignKey: 'mid2_id', as: 'mid2' });
UserSquad.belongsTo(Player, { foreignKey: 'mid3_id', as: 'mid3' });
UserSquad.belongsTo(Player, { foreignKey: 'mid4_id', as: 'mid4' });
UserSquad.belongsTo(Player, { foreignKey: 'mid5_id', as: 'mid5' });
UserSquad.belongsTo(Player, { foreignKey: 'fw1_id', as: 'fw1' });
UserSquad.belongsTo(Player, { foreignKey: 'fw2_id', as: 'fw2' });
UserSquad.belongsTo(Player, { foreignKey: 'fw3_id', as: 'fw3' });

// A user can have many starting players in their squad.
User.hasMany(UserStartingPlayers, { foreignKey: 'userId' });
UserStartingPlayers.belongsTo(User, { foreignKey: 'userId' });


UserStartingPlayers.belongsTo(Player, { foreignKey: 'playerId' });
Player.hasMany(UserStartingPlayers, { foreignKey: 'playerId' })

