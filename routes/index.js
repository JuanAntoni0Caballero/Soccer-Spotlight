module.exports = app => {

    //Index routes
    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    //Auth routes
    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)


    //User routes
    const userRoutes = require("./user.routes")
    app.use("/users", userRoutes)


    //Fixture routes
    const fixtureRoutes = require("./fixture.routes")
    app.use("/matches", fixtureRoutes)


    //Teams routes
    const teamRoutes = require("./team.routes.js")
    app.use("/", teamRoutes)


    //League routes
    const leagueRoutes = require("./league.routes")
    app.use("/", leagueRoutes)


    //Player routes
    const playerRoutes = require("./player.routes.js")
    app.use("/", playerRoutes)
}


