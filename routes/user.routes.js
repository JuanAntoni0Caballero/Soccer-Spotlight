const express = require('express')
const { isLoggedIn } = require('../middleware/route-guards')
const User = require('../models/User.model')
const { userIsAdmin } = require('../utils')
const router = express.Router()

router.get('/', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'user' })
        .then(users => res.render('users/users-list', { users }))
        .catch(err => next(err))
})

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('users/user-profile', { user: req.session.currentUser })
})




router.get('/profile/:id', isLoggedIn, (req, res, next) => {

    const { id: user_id } = req.params

    User
        .findById(user_id)

        .then(user => res.render('users/user-profile', user))

        .catch(err => next(err))

})



module.exports = router

