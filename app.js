require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);
require('./config/session.confi')(app)

app.locals.appTitle = "Soccer Spotlight ⚽️"

require('./routes/')(app)

const localSession = require('./middleware/local-session')(app)
app.use(localSession)

require("./error-handling")(app);

module.exports = app;
