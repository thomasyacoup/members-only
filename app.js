const express = require('express')
const path = require('path')
const session_middleware = require('./config/session')
const passport = require('./config/passport')

const app = express()

app.set("views", path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session_middleware)
app.use(passport.initialize())
app.use(passport.session())