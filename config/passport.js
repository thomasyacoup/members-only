const passport = require('passport')
const { getUserById, getUserByUsername } = require('../models/user.model')
const isValidPassword = require('../lib/isValidPassword')
const Strategy = require('passport-local').Strategy

const verifyCallBack = async (username, password, done) => {
  try {
    const user = await getUserByUsername(username)
    if (!user) return done(null, false, { message: 'Username not found.' })

    if (!isValidPassword(password, user.pw_hash)) return done(null, false, { message: 'Password do not match.' })

    return done(null, user)
  } catch(err) {
    done(err)
  }
}

const strategy = new Strategy(verifyCallBack)

passport.use(strategy)

passport.serializeUser((user, done)=> {
  return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
})

module.exports = passport