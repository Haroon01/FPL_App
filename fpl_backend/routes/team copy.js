const express = require('express');
const authentication = require('../middleware/authentication');
const router = express.Router();
const { Sequelize } = require("sequelize");

const UserSquad = require('../models/UserSquad');
const User = require('../models/User');
const Player = require('../models/Player');
const UserStartingPlayers = require('../models/UserStartingPlayers');

router.post('/newteam/save', authentication, async (req, res) => {
    //console.log(req.body[0])
    const username = req.user.username;
    const [gkArray, defArray, midArray, fwArray] = req.body;
    
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user){
            return res.status(404).send("User not found!")
        }
        const squad = await UserSquad.findOne({ where: { userId: user.id } });
        if (!squad){
            const squadArr = await UserSquad.create({
                userId: user.id,
                gk1_id: gkArray[0].id,
                gk2_id: gkArray[1].id,
                def1_id: defArray[0].id,
                def2_id: defArray[1].id,
                def3_id: defArray[2].id,
                def4_id: defArray[3].id,
                def5_id: defArray[4].id,
                mid1_id: midArray[0].id,
                mid2_id: midArray[1].id,
                mid3_id: midArray[2].id,
                mid4_id: midArray[3].id,
                mid5_id: midArray[4].id,
                fw1_id: fwArray[0].id,
                fw2_id: fwArray[1].id,
                fw3_id: fwArray[2].id
            });

            const newSquadId = squadArr.id;
            console.log(newSquadId)
            const startingPlayers = [
                { userSquadId: newSquadId, userId: user.id, playerId: gkArray[0].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: gkArray[1].id, isBenched: true },
                { userSquadId: newSquadId, userId: user.id, playerId: defArray[0].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: defArray[1].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: defArray[2].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: defArray[3].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: defArray[4].id, isBenched: true },
                { userSquadId: newSquadId, userId: user.id, playerId: midArray[0].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: midArray[1].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: midArray[2].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: midArray[3].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: midArray[4].id, isBenched: true },
                { userSquadId: newSquadId, userId: user.id, playerId: fwArray[0].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: fwArray[1].id, isBenched: false },
                { userSquadId: newSquadId, userId: user.id, playerId: fwArray[2].id, isBenched: true },
            ]

            for (let player of startingPlayers){
                await UserStartingPlayers.create(player)
            }
        } else {
            squad.gk1_id = gkArray[0].id;
            squad.gk2_id = gkArray[1].id;
            squad.def1_id = defArray[0].id;
            squad.def2_id = defArray[1].id;
            squad.def3_id = defArray[2].id;
            squad.def4_id = defArray[3].id;
            squad.def5_id = defArray[4].id;
            squad.mid1_id = midArray[0].id;
            squad.mid2_id = midArray[1].id;
            squad.mid3_id = midArray[2].id;
            squad.mid4_id = midArray[3].id;
            squad.mid5_id = midArray[4].id;
            squad.fw1_id = fwArray[0].id;
            squad.fw2_id = fwArray[1].id;
            squad.fw3_id = fwArray[2].id;
            await squad.save();

            const playerIds = [
                gkArray[0].id, gkArray[1].id,
                defArray[0].id, defArray[1].id, defArray[2].id, defArray[3].id, defArray[4].id,
                midArray[0].id, midArray[1].id, midArray[2].id, midArray[3].id, midArray[4].id,
                fwArray[0].id, fwArray[1].id, fwArray[2].id
            ];
            
            // Fetch the current UserStartingPlayers records for the user
            const currentPlayers = await UserStartingPlayers.findAll({ where: { userId: user.id } });
            
            // Create a map of playerId to isBenched status
            const isBenchedMap = {};
            currentPlayers.forEach(player => {
                isBenchedMap[player.playerId] = player.isBenched;
            });
            
            // Delete all current UserStartingPlayers records for the user
            await UserStartingPlayers.destroy({ where: { userId: user.id } });
            
            // Create new UserStartingPlayers records with the new playerIds and the old isBenched status
            for (let playerId of playerIds) {
                const isBenched = isBenchedMap[playerId] || false;
                await UserStartingPlayers.create({ userSquadId: squad.id, userId: user.id, playerId: playerId, isBenched: isBenched });
            }
        }

        res.send("Team saved successfully!")
    } catch (error) {
        console.log(error) 
        res.status(500).send("Error occured while saving team!")
    }

});

router.get("/getteam", authentication, async (req, res) => {
    const username = req.user.username;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user){
            return res.status(404).send("User not found!")
        }
        const squad = await UserSquad.findOne({ where: { userId: user.id } });
        if (!squad){
            return res.status(404).send("Squad not found!")
        
        }

        const playerPositions = {
            gk1: squad.gk1_id,
            gk2: squad.gk2_id,
            def1: squad.def1_id,
            def2: squad.def2_id,
            def3: squad.def3_id,
            def4: squad.def4_id,
            def5: squad.def5_id,
            mid1: squad.mid1_id,
            mid2: squad.mid2_id,
            mid3: squad.mid3_id,
            mid4: squad.mid4_id,
            mid5: squad.mid5_id,
            fw1: squad.fw1_id,
            fw2: squad.fw2_id,
            fw3: squad.fw3_id
        };
        
        const players = {};
        
        for (let position in playerPositions) {
            const playerId = playerPositions[position];
            const player = await Player.findOne({ where: { id: playerId } });
            players[position] = player;
        }
        
        res.json(players);
    } catch (error) {
        console.log(error)
        res.status(500).send("Error occured while fetching team!")
    }
}); // getteam

router.get("/getcurrent", authentication, async (req, res) => {
    const username = req.user.username;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user){
            return res.status(404).send("User not found!")
        }
        const userSquad = await UserSquad.findOne({ where: { userId: user.id } });
        if (!userSquad){
            return res.status(404).send("Squad not found!")
        
        }

        const userSquadWithBenched = await User.findOne({
            where: { id: user.id },
            include: [
                { model: UserStartingPlayers, }
            ]
        });
        // Extract playerIds from UserStartingPlayers data
        const playerIds = userSquadWithBenched.UserStartingPlayers.map(player => player.playerId);

        // Fetch players from Players table
        const players = await Player.findAll({
            where: { id: { [Sequelize.Op.in]: playerIds } } // compares Player.id with playerIds and matches them to get full player data
        });

        // Map players to include isBenched status
        const playersWithBenchStatus = players.map(player => {
            const playerStartingData = userSquadWithBenched.UserStartingPlayers.find(p => p.playerId === player.id);
            return {
                ...player.get(), // Get plain data values of player
                isBenched: playerStartingData ? playerStartingData.isBenched : false
            };
        });

        const gk = playersWithBenchStatus.filter(player => player.pos === "Goalkeeper" && !player.isBenched);
        const def = playersWithBenchStatus.filter(player => player.pos === "Defender" && !player.isBenched);
        const mid = playersWithBenchStatus.filter(player => player.pos === "Midfielder" && !player.isBenched);
        const fw = playersWithBenchStatus.filter(player => player.pos === "Forward" && !player.isBenched);
        const bench = playersWithBenchStatus.filter(player => player.isBenched);

        res.json({ gk, def, mid, fw, bench });
        //res.json(playersWithBenchStatus);
    } catch (error) {
        console.log(error)
        res.status(500).send("Error occured while fetching current team!")
    }
});
module.exports = router;