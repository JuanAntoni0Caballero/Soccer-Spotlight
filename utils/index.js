const userIsLoggedin = () => req.session.currentUser

const userIsRole = (...roles) => roles.includes(req.session.currentUser.role)

const userIsOwner = (user) => req.session.currentUser?._id === user.id

module.exports = { userIsRole, userIsLoggedin, userIsOwner }