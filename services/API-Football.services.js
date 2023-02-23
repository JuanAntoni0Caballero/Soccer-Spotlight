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

    getAllMatches = (year = 2022) => {
        return this.api.get(`/fixtures?league=140&season=${year}`)
    }

    getAllTeams = (year = 2022) => {
        return this.api.get(`/teams?league=140&season=${year}`)
    }

    getOneTeam = (teamId, year = 2022) => {
        return this.api.get(`/teams/statistics?league=140&season=${year}&team=${teamId}`)
    }

    getLeagueStandings = () => {
        return this.api.get()
    }

    getAllPlayers = (teamId, year = 2022) => {
        return this.api.get(`/players?league=140&season=${year}&team=${teamId}`)
    }



}

module.exports = ApiService