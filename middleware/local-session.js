

const localSession = (req, res, next) => {

    console.log('probando localSession');

    if (req.session.currentUser) {
        req.app.locals.currentUserId = req.session.currentUser._id
    } else {
        req.app.locals.currentUserId = null
    }
    next()

}

module.exports = (app) => {
    return localSession
}