const Club = require("./Club")
const Player = require("./Player")
const User = require("./User")
const UserSquad = require("./UserSquad")
const UserStartingPlayers = require("./UserStartingPlayers");
const Gameweek = require("./Gameweek");

// User can have one squad, and the squad belongs to that user only.
User.hasOne(UserSquad, { foreignKey: 'userId' });
UserSquad.belongsTo(User, { foreignKey: 'userId' });


// UserSquad can have many players
UserSquad.belongsTo(Player, { foreignKey: 'gk1_id' });
UserSquad.belongsTo(Player, { foreignKey: 'gk2_id' });
UserSquad.belongsTo(Player, { foreignKey: 'def1_id' });
UserSquad.belongsTo(Player, { foreignKey: 'def2_id' });
UserSquad.belongsTo(Player, { foreignKey: 'def3_id' });
UserSquad.belongsTo(Player, { foreignKey: 'def4_id' });
UserSquad.belongsTo(Player, { foreignKey: 'def5_id' });
UserSquad.belongsTo(Player, { foreignKey: 'mid1_id' });
UserSquad.belongsTo(Player, { foreignKey: 'mid2_id' });
UserSquad.belongsTo(Player, { foreignKey: 'mid3_id' });
UserSquad.belongsTo(Player, { foreignKey: 'mid4_id'});
UserSquad.belongsTo(Player, { foreignKey: 'mid5_id'});
UserSquad.belongsTo(Player, { foreignKey: 'fw1_id'});
UserSquad.belongsTo(Player, { foreignKey: 'fw2_id'});
UserSquad.belongsTo(Player, { foreignKey: 'fw3_id'});

// A user can have many starting players in their squad.
User.hasMany(UserStartingPlayers, { foreignKey: 'userId' });
UserStartingPlayers.belongsTo(User, { foreignKey: 'userId' });


UserStartingPlayers.belongsTo(Player, { foreignKey: 'playerId' });
Player.hasMany(UserStartingPlayers, { foreignKey: 'playerId' })

// // In your UserSquad model definition
// UserSquad.hasMany(UserStartingPlayers, { foreignKey: 'squadId' });

// // In your UserStartingPlayers model definition
// UserStartingPlayers.belongsTo(UserSquad, { foreignKey: 'squadId' });

Player.belongsTo(Club, { foreignKey: 'team' });
Club.hasMany(Player, { foreignKey: 'team' });

UserSquad.belongsTo(Gameweek, { foreignKey: 'gameweek_id' });
Gameweek.hasMany(UserSquad, { foreignKey: 'gameweek_id' });