const express = require("express");
const app = express();
const cors = require("cors")
const PORT = 3001

const sequelize = require("./database")
//const models = require("./models") // DB models here.

const FantasyPL = require("./FantasyPL");
const { Sequelize } = require("sequelize");
const fpl = new FantasyPL()

let team_id = "2929140" // my fpl team for testing

app.use(cors())

// app.get("/api/players", async (req, res) => {
//     await fpl.getAllPlayers().then((response)=>{
//         res.send(response.elements)
//         // for (i = 0; i<data.length; i++){
//         //     //console.log(data[i].first_name + " " + data[i].second_name)
//         //     res.send(data)
//         // }
//     })
// })
function syncPlayers(){
    let a = fpl.getAllPlayers();
    console.log(a)
}
sequelize.sync({ force: false }) // true if i want to drop tables and start over
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server runnning on port ${PORT}`)
            syncPlayers()
        })
    })
    .catch((err) => {
        console.log(`Error with db: ${err}`)
    })

