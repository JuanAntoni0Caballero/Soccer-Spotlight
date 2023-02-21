const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const { userIsAdmin } = require('../utils')
const router = express.Router()



router.get('/teams', (req, res, next) => {

    res.render('info/teams-list')

})


router.get('/teams-details', (req, res, next) => {

    res.render('info/teams-details')

})



module.exports = router