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


async function syncPlayers(){

    let element_types = [
        {
            "id": 1,
            "plural_name": "Goalkeepers",
            "plural_name_short": "GKP",
            "singular_name": "Goalkeeper",
            "singular_name_short": "GKP",
            "squad_select": 2,
            "squad_min_play": 1,
            "squad_max_play": 1,
            "ui_shirt_specific": true,
            "sub_positions_locked": [
                12
            ],
            "element_count": 85
        },
        {
            "id": 2,
            "plural_name": "Defenders",
            "plural_name_short": "DEF",
            "singular_name": "Defender",
            "singular_name_short": "DEF",
            "squad_select": 5,
            "squad_min_play": 3,
            "squad_max_play": 5,
            "ui_shirt_specific": false,
            "sub_positions_locked": [],
            "element_count": 241
        },
        {
            "id": 3,
            "plural_name": "Midfielders",
            "plural_name_short": "MID",
            "singular_name": "Midfielder",
            "singular_name_short": "MID",
            "squad_select": 5,
            "squad_min_play": 2,
            "squad_max_play": 5,
            "ui_shirt_specific": false,
            "sub_positions_locked": [],
            "element_count": 321
        },
        {
            "id": 4,
            "plural_name": "Forwards",
            "plural_name_short": "FWD",
            "singular_name": "Forward",
            "singular_name_short": "FWD",
            "squad_select": 3,
            "squad_min_play": 1,
            "squad_max_play": 3,
            "ui_shirt_specific": false,
            "sub_positions_locked": [],
            "element_count": 96
        }
    ]


    let a = await fpl.getAllPlayers();
    let b = a.elements
    for (let i = 0; i < b.length; i++){
        if (b[i]["first_name"] == "Bukayo"){
            let temp_arr = [
                {
                    "first_name": b[i]["first_name"],
                    "last_name": b[i]["second_name"],
                    "pos": element_types[b[i]["element_type"] - 1]["singular_name"], // position is stored as a number in fpl api, this uses that number and gets pos from array above
                    "points": b[i]["event_points"]
                }
            ]
            console.log(temp_arr)
        }

        
        //break;
    }
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

