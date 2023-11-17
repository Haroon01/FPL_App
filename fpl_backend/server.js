const express = require("express");
const app = express();
const PORT = 3001

const FantasyPL = require("./FantasyPL")
const fpl = new FantasyPL()

let team_id = "2929140"

fpl.getManagerById(team_id).then((res)=>{
    console.log(res)
})

app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})
