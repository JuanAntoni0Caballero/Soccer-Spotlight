const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware/route-guards')
const uploaderMiddleware = require('../middleware/uploader.middleware')

const { userIsAdmin } = require('../utils')

const User = require('../models/User.model')


router.get('/', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'user' })
        .then(users => res.render('users/users-list', { users }))
        .catch(err => next(err))
})


// Profile owner profile
router.get('/profile', isLoggedIn, (req, res, next) => {

    const id = req.session.currentUser._id
    User
        .findById(id)
        .then(user => res.render('users/user-profile', user))
        .catch(err => next(err))
})

//Edit info form render

router.get('/profile/edit', (req, res, next) => {
    res.render('users/edit-user', { user: req.session.currentUser })
})

//Edit info form handler

router.post('/profile/edit', uploaderMiddleware.single('avatar'), (req, res, next) => {

    let { email, username, userPwd, birthday } = req.body
    const { _id: id } = req.session.currentUser

    let avatar = ''

    if (req.file) {
        avatar = req.file.path
    } else {
        avatar = req.session.currentUser.avatar
        console.log('No hay regfile y este es el avatar', avatar);
    }

    if (birthday === '') {
        console.log('bday is working')
        birthday = req.session.currentUser.birthday
    }

    User
        .findByIdAndUpdate(id, { email, username, userPwd, birthday, avatar })
        .then(() => res.redirect('/users/profile'))
        .catch(err => next(err))
})




module.exports = router

