const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const { userIsAdmin } = require('../utils')
const router = express.Router()
const comments = require('../models/Comments.model')




router.get('/', (req, res, next) => {

    res.render('info/fixtures-list')

})


router.get('/:match_id', (req, res, next) => {

    res.render('info/fixtures-details')

})



router.get('/create', (req, res) => {
    res.render('info/fixtures-details')
})


router.post('/create', (req, res) => {


    const { title, comment } = req.body

    comments
        .create({ title, comment })
        .then(elm => res.redirect(`/fixtures-details`))
        .catch(err => next(err))
})

module.exports = router