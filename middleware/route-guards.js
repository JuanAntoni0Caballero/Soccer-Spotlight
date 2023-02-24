const isLoggedIn = (req, res, next) => req.session.currentUser ? next() : res.render('auth/user-login', { errorMessage: 'Log in to continue' })

const isLoggedOut = (req, res, next) => !req.session.currentUser ? next() : res.redirect('/')



const checkRole = (...roles) => (req, res, next) => {

    roles.includes(req.session.currentUser.role) ? next() : res.render('/', { errorMessage: 'You do not have authorization' })

}

module.exports = { isLoggedIn, isLoggedOut, checkRole }