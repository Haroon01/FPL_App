const express = require('express');
const authentication = require('../middleware/authentication');
const Gameweek = require("../models/Gameweek");
const router = express.Router();

router.get('/homepage/data', authentication, async (req, res) => {
    const gw_curr = await Gameweek.findOne({
        where: { is_current: true}
    })
    const gw_next = await Gameweek.findOne({
        where: { is_next: true}
    })
    res.status(200).send({
        "current": gw_curr,
        "next": gw_next
    })
});

router.get('/current', authentication, async (req, res) => {
    const gw_curr = await Gameweek.findOne({
        where: { is_current: true}
    })
    res.status(200).send(gw_curr)
});

module.exports = router;