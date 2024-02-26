const express = require("express");
const session = require("express-session");
const PORT = 3001

// misc imports
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./database")
const { Sequelize } = require("sequelize");
const FantasyPL = require("./FantasyPL");
const fpl = new FantasyPL()
require('dotenv').config();

// DB Models
const Player = require("./models/Player") // Player model for DB
const Club = require("./models/Club")
const User = require("./models/User")
const UserSquad = require("./models/UserSquad")
const UserStartingPlayers = require("./models/UserStartingPlayers")

//Routes
const authRoute = require("./routes/auth");
const signUpRoute = require("./routes/signup");
const profileRoute = require("./routes/profile");
const playersRoute = require("./routes/players");

const app = express();
app.use(session({
    secret: process.env.JWT_KEY,
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false }, // true if using https! <--TODO
}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/signup", signUpRoute);
app.use("/profile", profileRoute);
app.use("/players", playersRoute);

app.get("/api/players", async (req, res) => {
    try{
        const players = await Player.findAll();
        res.json(players)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error. Please try again later.")
    }
})

sequelize.sync({ force: false }) // true if i want to drop tables and start over
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server runnning on port ${PORT}`)
            //fpl.syncPlayers() // get this to run on a schedule. already done for testing so leave commented. 
        })
    })
    .catch((err) => {
        console.log(`Error with db: ${err}`);
    })

