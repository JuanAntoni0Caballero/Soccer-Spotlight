const isLoggedIn = (req, res, next) => {

    req.session.currentUser ? next() : res.render('/login', { errorMessage: 'Log in to continue' })

}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}

const checkRole = (...roles) => (req, res, next) => {

    if (roles.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('/', { errorMessage: 'You do not have authorization' })
    }
}

module.exports = { isLoggedIn, isLoggedOut, checkRole }