const express = require('express');
const authentication = require('../middleware/authentication');
const { Sequelize } = require("sequelize");
const Player = require("../models/Player");
const Club = require("../models/Club");
const router = express.Router();

router.get('/type/:type', authentication, async (req, res) => {
    let playerType = "";
    switch(req.params.type){
        case "gk":
            playerType = "Goalkeeper";
            break;
        case "def":
            playerType = "Defender";
            break;
        case "mid":
            playerType = "Midfielder";
            break;
        case "fw":
            playerType = "Forward";
            break;
    }
    try{
        let players = await Player.findAll({
            where: { pos: playerType },
            include: [{
                model: Club,
                attributes: ["name"],
                where: { id: Sequelize.col("Player.team")}
            
            }]
        })

        // Map over the players array and modify each player object
        players = players.map(player => {
            // Convert the player instance to a plain object
            const playerData = player.toJSON();

            // Replace the Club object with the club name, if the Club is not undefined
            let clubName;
            if (playerData.Club) {
                clubName = playerData.Club.name;
                delete playerData.Club;
            }

            // Create a new object with all properties of playerData and the modified club property
            return { ...playerData, club: clubName };
        });
        
        //console.log(players)
        res.json(players)
    } catch (error) {
        console.log("error in players.js backend")
        console.log(error)
        res.status(500).send("Error occured while getting players!")
    }


});

router.get("/news", authentication, async (req, res) => {
    try{
        let players = await Player.findAll({
            where: {
                chance_of_playing_next_round: {
                    [Sequelize.Op.ne]: 100,
                    [Sequelize.Op.ne]: 0
                },
                news: {
                    [Sequelize.Op.ne]: ""
                }
            }
        })
        res.json(players)
    } catch (error) {
        console.log("error in players.js backend")
        console.log(error)
    }
})

module.exports = router;