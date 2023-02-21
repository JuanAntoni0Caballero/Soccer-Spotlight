const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const { userIsAdmin } = require('../utils')
const router = express.Router()



router.get('/players', (req, res, next) => {

    res.render('info//players-list')

})


router.get('/players-details', (req, res, next) => {

    res.render('info/players-details')

})



module.exports = router