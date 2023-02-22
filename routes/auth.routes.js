const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guards');
const uploaderMiddleware = require('../middleware/uploader.middleware');

const saltRounds = 10

const User = require('../models/User.model');


//Sign in form render
router.get('/signup', isLoggedOut, (req, res, next) => {
    res.render('auth/user-signup')
})

//Sign in form handler
router.post('/signup', isLoggedOut, uploaderMiddleware.single('avatar'), (req, res, next) => {

    const { email, username, userPwd, birthday } = req.body
    const { path: avatar } = req.file

    if (username.length === 0 || email.length === 0 || userPwd.length === 0) {
        res.render('auth/user-signup', { errorMessage: 'Complete all the require fields' })
        return
    }

    // Call password validation here before hashing it
    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(pwdHash => User.create({ username, email, password: pwdHash, birthday, avatar }))
        .then(res.redirect('/'))
        .catch(err => console.log(err))
});



//Log in form handler
router.get('/login', isLoggedOut, (req, res, next) => {
    res.render('auth/user-login')
})

router.post('/login', isLoggedOut, (req, res, next) => {

    const { username, userPwd } = req.body

    if (username.length === 0 || userPwd === 0) {
        res.render('auth/user-login', { errorMessage: 'Enter your username and password' })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            // res.send(user)
            if (!user) {
                res.render('auth/user-login', { errorMessage: 'Username is not registered' })
            } else if (!bcrypt.compareSync(userPwd, user.password)) {
                res.render('auth/user-login', { errorMessage: 'Incorrect password' })
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})



module.exports = router;
