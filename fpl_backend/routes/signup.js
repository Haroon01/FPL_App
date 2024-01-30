const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")
const { UniqueConstraintError } = require("sequelize");

router.post("/createaccount", async (req, res) => {
    try{
        const {username, password, first_name, last_name, email} = req.body

        const hashedPw = await bcrypt.hash(password, 10)

        const createUser = await User.create({
            username: username,
            password: hashedPw,
            first_name: first_name,
            last_name: last_name,
            email: email
        })

        res.status(201).json({
            message: "User created successfully!"
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            // Handle unique constraint violation (username or email already exists)
            const errors = error.errors.map((err) => ({
                field: err.path,
                message: err.message,
            }));

            return res.status(400).json({
                message: "Validation error",
                errors,
            });
        }
    
        res.status(500).json({
            message: "Internal server error",
        });
    }
})

module.exports = router;