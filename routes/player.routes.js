const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const { userIsAdmin } = require('../utils')
const router = express.Router()
const ApiService = require('../services/API-Football.services')
const { formToJSON } = require('axios')
const { response } = require('express')
const footballApi = new ApiService()



router.get('/players', (req, res, next) => {

    footballApi
        .getAllPlayers()
        .then(response => {
            const players = response.data.response.sort((teamA, teamB) => {

                const nameA = teamA.statistics[0].team.name
                const nameB = teamB.statistics[0].team.name



                if (nameA < nameB) {
                    return -1
                } else if (nameA > nameB) {
                    return 1
                } else {
                    return 0
                }
            })
            res.render('info/players-list', { players })
        })
        .catch(err => next(err))

})


router.get('/players-details', (req, res, next) => {

    res.render('info/players-details')

})



module.exports = router