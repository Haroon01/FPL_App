const express = require('express');
const authentication = require('../middleware/authentication');
const Player = require("../models/Player");
const router = express.Router();

router.get('/:type', authentication, async (req, res) => {
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
        const players = await Player.findAll({
            where: { pos: playerType }
        })
        //console.log(players)
        res.json(players)
    } catch (error) {
        console.log("error")
        res.status(500).send("Error occured while getting players!")
    }

    
    //res.send("req.data")
    // const username = req.user.username;
    // const user = await User.findOne({
    //     where: { username: username },
    // });
    // res.send({
    //     username: user.dataValues.username,
    //     first_name: user.dataValues.first_name,
    //     last_name: user.dataValues.last_name,
    //     email: user.dataValues.email,
    //     user_since: user.dataValues.createdAt
    // });
});

module.exports = router;