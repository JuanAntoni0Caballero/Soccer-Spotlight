const { response } = require('express')
const express = require('express')
const router = express.Router()

const ApiService = require('../services/API-Football.services')
const footballApi = new ApiService()


router.get('/leagues', (req, res, next) => {

    footballApi
        .getLeagueStandings()
        .then(response => {
            const standings = response.data.response[0].league.standings[0]
            res.render('info/leagues-list', { standings })
        })
        .catch(err => next(err))
})


router.get('/leagues-details', (req, res, next) => {

    res.render('info/leagues-details')

})



module.exports = router