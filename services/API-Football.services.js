const axios = require('axios')
const API_KEY = process.env.API_KEY
const API_HOST = process.env.API_HOST

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        })
    }

    getAllMatches = () => {
        return this.api.get('/matches')
    }

    getAllTeams = (year = 2022) => {
        return this.api.get(`/teams?league=140&season=${year}`)
            .then(teams => teams.data.response)
    }

    getOneTeams = (year = 2022, teamId) => {
        return this.api.get(`/teams/statistics?league=140&season=${year}&team=${teamId}`)
            .then(teams => teams.data.response)
    }


}

module.exports = ApiService