const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const { userIsAdmin } = require('../utils')
const router = express.Router()



router.get('/leagues', (req, res, next) => {

    res.render('info/leagues-list')

})


router.get('/leagues-details', (req, res, next) => {

    res.render('info/leagues-details')

})



module.exports = router