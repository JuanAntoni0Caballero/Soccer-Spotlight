const axios = require('axios')
const API_KEY = process.env.API_KEY
const API_HOST = process.env.API_HOST

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: ' https://api-football-v1.p.rapidapi.com/v3/',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        })
    }

    getAllMatches = () => {
        return this.api.get('/matches')
    }

    getAllTeams = () => {

        return this.api.get(`/teams?league=140&season=2022`)
            .then(teams => teams.data.response)
    }


}

module.exports = ApiService