const express = require('express');
const authentication = require('../middleware/authentication');
const User = require("../models/User");
const router = express.Router();

router.get('/data', authentication, async (req, res) => {
    // Your code logic for the route goes here
    const username = req.user.username;
    const user = await User.findOne({
        where: { username: username },
    });
    res.send({
        username: user.dataValues.username,
        first_name: user.dataValues.first_name,
        last_name: user.dataValues.last_name,
        email: user.dataValues.email,
        user_since: user.dataValues.createdAt
    });
});

module.exports = router;