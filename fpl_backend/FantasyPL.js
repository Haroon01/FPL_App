const axios = require("axios");


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

    getAllPlayers(){
        return this.execute("/bootstrap-static/")
    }


}

module.exports = FantasyPL