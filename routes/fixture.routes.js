const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const { userIsAdmin } = require('../utils')
const router = express.Router()
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')




router.get('/', (req, res, next) => {

    res.render('info/fixtures-list')

})


router.get('/details', (req, res, next) => {

    res.render('info/fixtures-details')

})



router.get('/create', (req, res, next) => {
    res.render('info/fixtures-details')
})


router.post('/create', (req, res, next) => {


    const { title, comment } = req.body

    const { _id: owner } = req.session.currentUser

    Comment
        .create({ title, comment, owner })
        .then(elm => res.redirect(`/matches/details`))
        .catch(err => next(err))
})

module.exports = router