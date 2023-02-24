const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware/route-guards')
const uploaderMiddleware = require('../middleware/uploader.middleware')

const ApiService = require('../services/API-Football.services')
const footballApi = new ApiService()

const { userIsAdmin } = require('../utils')

const User = require('../models/User.model')


router.get('/', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'user' })
        .sort({ username: 1 })
        .then(users => res.render('users/users-list', { users }))
        .catch(err => next(err))
})


// Owner profile
router.get('/profile', isLoggedIn, (req, res, next) => {

    const { _id: id } = req.session.currentUser

    User
        .findById(id)
        .populate('friends')
        .then(user => {

            const promises = user.favoriteTeams.map(elm => footballApi.getOneTeam(elm))

            Promise
                .all(promises)
                .then((teams) => {
                    const myTeams = teams.map(elm => elm.data.response)
                    res.render('users/user-profile', {
                        user,
                        myTeams,
                        isOwner: req.session.currentUser._id === user._id.toString()
                    })
                })
        })
        .catch(err => next(err))
})


// Edit info form render
router.get('/profile/edit', (req, res, next) => {
    res.render('users/edit-user', { user: req.session.currentUser })
})


// Edit info form handler
router.post('/profile/edit', uploaderMiddleware.single('avatar'), (req, res, next) => {

    let { email, username, userPwd, birthday } = req.body
    const { _id: id } = req.session.currentUser

    let avatar = req.file ? req.file.path : req.session.currentUser.avatar

    if (!birthday) {
        birthday = req.session.currentUser.birthday
    }

    User
        .findByIdAndUpdate(id, { email, username, userPwd, birthday, avatar })
        .then(() => res.redirect('/users/profile'))
        .catch(err => next(err))
})


// Users profile
router.get('/profile/:_id', isLoggedIn, (req, res, next) => {

    const { _id: id } = req.params

    User
        .findById(id)
        .populate('friends')
        .then(user => {
            // res.send(user)
            res.render('users/user-details', { user })
        })
        .catch(err => next(err))
})


// Add user to friend
router.post('/:friend_id/addFriend', isLoggedIn, (req, res, next) => {

    const { friend_id } = req.params
    const user_id = req.session.currentUser._id

    const promises = [User.findByIdAndUpdate(user_id, { $addToSet: { friends: friend_id } }),
    User.findByIdAndUpdate(friend_id, { $addToSet: { friends: user_id } })]

    Promise
        .all(promises)
        .then(([currentUser, friend]) => res.redirect(`/users`))
        .catch(err => next(err))
})


// Delet user to friend
router.post('/profile/:friend_id/deletFriend', isLoggedIn, (req, res, next) => {

    const { friend_id } = req.params
    const user_id = req.session.currentUser._id

    const promises = [
        User.findByIdAndUpdate(user_id, { $pull: { friends: friend_id } }),
        User.findByIdAndUpdate(friend_id, { $pull: { friends: user_id } })]


    Promise
        .all(promises)
        .then(([currentUser, friend]) => res.redirect(`/users/profile`))
        .catch(err => next(err))
})


// Add favorite team
router.post('/:teamId/addTeam', isLoggedIn, (req, res, next) => {

    const { teamId } = req.params
    const user_id = req.session.currentUser._id

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favoriteTeams: teamId } })
        .then(() => res.redirect('/teams'))
        .catch(err => next(err))

})


// Delet favorite team
router.post('/profile/:teamId/deletTeam', isLoggedIn, (req, res, next) => {

    const { teamId } = req.params
    const user_id = req.session.currentUser._id

    User
        .findByIdAndUpdate(user_id, { $pull: { favoriteTeams: teamId } })
        .then(() => res.redirect(`/users/profile`))
        .catch(err => next(err))
})


module.exports = router