const express = require("express");
const app = express();
const cors = require("cors")
const PORT = 3001

const FantasyPL = require("./FantasyPL")
const fpl = new FantasyPL()

let team_id = "2929140"

app.use(cors())

app.get("/api/players", async (req, res) => {
    await fpl.getAllPlayers().then((response)=>{
        res.send(response.elements)
        // for (i = 0; i<data.length; i++){
        //     //console.log(data[i].first_name + " " + data[i].second_name)
        //     res.send(data)
        // }
    })
})

app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})
