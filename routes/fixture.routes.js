const express = require('express')
const router = express.Router()

const Comment = require('../models/Comment.model')
const User = require('../models/User.model')

const ApiService = require('../services/API-Football.services')
const footballApi = new ApiService()



router.get('/', (req, res, next) => {


    footballApi
        .getAllMatches()
        .then(response => {
            const matches = {
                lastMatches: response.data.response
                    .filter(match => match.fixture.status.elapsed === 90)
                    .sort((matchA, matchB) => {

                        const dateA = matchA.fixture.date
                        const dateB = matchB.fixture.date

                        if (dateA < dateB) {
                            return 1
                        } else if (dateA > dateB) {
                            return -1
                        } else {
                            return 0
                        }
                    })
                    .slice(0, 10),

                nextMatches: response.data.response
                    .filter(match => match.fixture.status.elapsed === null)
                    .sort((matchA, matchB) => {

                        const dateA = matchA.fixture.date
                        const dateB = matchB.fixture.date

                        if (dateA < dateB) {
                            return -1
                        } else if (dateA > dateB) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                    .slice(0, 10)
            }

            // res.send(matches)
            res.render('info/fixtures-list', { matches })
        })
        .catch(err => next(err))

})


//Match details
router.get('/details', (req, res, next) => {

    Comment

        .find()
        .sort({ createdAt: -1 })
        .populate('owner')
        .then(comments => res.render('info/fixtures-details', { comments }))
        .catch(err => next(err))
})


router.get('/', (req, res, next) => {

})

//Comment on match --> form render
router.get('/create', (req, res, next) => {
    res.render('info/fixtures-details')
})

//Comment on match --> form handler
router.post('/create', (req, res, next) => {

    const { title, comment } = req.body
    const { _id: owner } = req.session.currentUser

    Comment
        .create({ title, comment, owner })
        .then(elm => res.redirect(`/matches/details`))
        .catch(err => next(err))
})

module.exports = router