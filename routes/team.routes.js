const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const { userIsAdmin } = require('../utils')
const router = express.Router()
const ApiService = require('../services/API-Football.services')
const footballApi = new ApiService()



router.get('/', (req, res, next) => {

    footballApi
        .getAllTeams()
        // .sort()
        //.then(teams => res.send(teams.data.response))
        .then(response => {
            const teams = response.data.response.sort((teamA, teamB) => {

                const nameA = teamA.team.name
                const nameB = teamB.team.name

                if (nameA < nameB) {
                    return -1
                } else if (nameA > nameB) {
                    return 1
                } else {
                    return 0
                }
            })
            res.render('info/teams-list', { teams })
        })
        .catch(err => next(err))

})


router.get('/:id', (req, res, next) => {

    const { id } = req.params

    footballApi
        .getOneTeam(id)
        // .then(team => res.send(team))
        .then(team => res.render('info/teams-details', team.data.response))
        .catch(err => next(err))

})



module.exports = router