const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const { userIsAdmin } = require('../utils')
const router = express.Router()
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')
const ApiService = require('../services/API-Football.services')
const footballApi = new ApiService()




router.get('/', (req, res, next) => {


    // footballApi
    //     .getAllMatches()
    //     .then(response => res.render('info/fixtures-details', { matches: response.data }))
    //     .catch(err => next(err))

    res.render('info/fixtures-list')

})


router.get('/details', (req, res, next) => {

    Comment

        .find()
        .sort({ createdAt: -1 })
        .populate('owner')
        .then(comments => res.render('info/fixtures-details', { comments }))
        .catch(err => next(err))

})


router.get('/', (req, res, next) => {

        .find()
        .sort({ createdAt: -1 })
        .then(comments => res.render('info/fixtures-details', { comments }))
        .catch(err => next(err))


})


router.get('/', (req, res, next) => {

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