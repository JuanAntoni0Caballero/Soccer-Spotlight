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
        .then(teams => res.render('info/teams-list', { teams }))
        .catch(err => next(err))

})


router.get('/:id', (req, res, next) => {

    const { id } = req.params

    footballApi
        .getOneTeam(id)
        // .then(team => res.send(team))
        .then(team => res.render('info/teams-details', team))
        .catch(err => next(err))

})



module.exports = router