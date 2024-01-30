const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/fetchaccount", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: { username: username },
        });

        console.log(password)

        if (!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({
                message: "Username or Password is incorrect"
            })
        }

        const token = jwt.sign({ userId: user.id, username: user.username}, process.env.JWT_KEY, {
            expiresIn: "1h"
        });

        res.status(200).json({
            token,
            message: "Login Success"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

module.exports = router;