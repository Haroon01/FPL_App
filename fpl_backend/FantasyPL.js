const axios = require("axios");

// DB Models
const Player = require("./models/Player");
const Club = require("./models/Club");

//let team_id = "2929140" // my fpl team for testing


class FantasyPL {
    constructor(){
        this.api_url = "https://fantasy.premierleague.com/api";
    }

    async execute(endpoint){
        try{
            const response = await axios.get(this.api_url + endpoint)
            return response.data
        } catch {
            console.log("error")
        }
        
    }

    getManagerById(id){
        console.log(this.api_url + "/entry/" + id)
        return this.execute("/entry/" + id)
    }

    getAllFixtures(){
        return this.execute("/fixtures/")
    }

    getAllData(){ // gets all data from /bootstrap-static/
        return this.execute("/bootstrap-static/")
    }

    // .teams for teams
    // .elements for players
    // 

    async syncPlayers(){
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
    
    
        let getData = await this.getAllData();
        let playerElements = getData.elements
        let playerArray = [];
        for (let i = 0; i < playerElements.length; i++){
            console.log(playerElements[i]["web_name"])
            playerArray.push(
                {
                    "first_name": playerElements[i]["first_name"],
                    "last_name": playerElements[i]["second_name"],
                    "short_name": playerElements[i]["web_name"],
                    "pos": element_types[playerElements[i]["element_type"] - 1]["singular_name"], // position is stored as a number in fpl api, this uses that number and gets pos from array above
                    "points": playerElements[i]["event_points"],
                    "chance_of_playing_next_round": playerElements[i]["chance_of_playing_next_round"],
                    "chance_of_playing_this_round": playerElements[i]["chance_of_playing_this_round"],
                    "form": playerElements[i]["form"],
                    "selected_by_percent": playerElements[i]["selected_by_percent"],
                    "now_cost": playerElements[i]["now_cost"], // player current cost
                    "news": playerElements[i]["news"],
                    "news_added": playerElements[i]["news_added"],
                    "fpl_id": playerElements[i]["id"],
                    "squad_number": playerElements[i]["squad_number"],
                    "team": playerElements[i]["team"],
    
                }
            )
        }
    
        let teamElements = getData.teams
        let teamArray = [];
        for (let i = 0; i < teamElements.length; i++){
            teamArray.push(
                {
                    "code": teamElements[i]["code"],
                    "draw": teamElements[i]["draw"],
                    "form": teamElements[i]["form"],
                    "team_id": teamElements[i]["id"],
                    "loss": teamElements[i]["loss"],
                    "name": teamElements[i]["name"],
                    "played": teamElements[i]["played"],
                    "points": teamElements[i]["points"],
                    "position": teamElements[i]["position"],
                    "short_name": teamElements[i]["short_name"],
                    "strength": teamElements[i]["strength"],
                    "unavailable": teamElements[i]["unavailable"],
                    "win": teamElements[i]["win"],
                    "pulse_id": teamElements[i]["pulse_id"],
                }
            )
        }
        //console.log(playerArray)
    
        try{
            await Player.bulkCreate(playerArray)
            await Club.bulkCreate(teamArray)
            console.log("Synced players/Teams with database")
        } catch (error) {
            console.log("ERROR: unable to sync players with DB\n" + error)
        }
        
        //return playerArray
    }


}

module.exports = FantasyPL