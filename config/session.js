const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db')
require('dotenv').config()

const session_middleware = session({
  store: new pgSession({
    pool,
    tableName: 'session',
    createTableIfMissing: true,
  }),

  secret: process.env.SECRET || 'cats',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  }
})

module.exports = session_middleware