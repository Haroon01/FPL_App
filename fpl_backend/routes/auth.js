const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authentication");


const User = require("../models/User");

const router = express.Router();


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
            expiresIn: "72h"
        });

        const expirationTime = new Date(Date.now() + 72 * 60 * 60 * 1000);
        let cookie = res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
            secure: false, // true when https. TODO
            sameSite:'lax',
            path: "/",
            expires: expirationTime
        })

        res.status(200).json({
            //token,
            message: "Login Success"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.get("/isauth", authentication, (req, res) => {
    res.status(200).json({ message: "authorized", user: req.user });
});

router.post("/logout", (req, res) => {
    try{
        // res.cookie(process.env.COOKIE_NAME, '', {
        //     maxAge: 0,
        //     httpOnly: true,
        //     secure: false, // Set to true if using HTTPS
        //     sameSite: 'lax',
        // });
        //console.log(process.env.COOKIE_NAME)
        
        res.clearCookie(process.env.COOKIE_NAME, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'lax',
            path: "/"
        })
        res.status(200).json({ message: "Log out successful"})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Log out unsuccessful"})
    }

})


module.exports = router;