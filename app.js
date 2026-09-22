const express = require('express')
const path = require('path')
const session_middleware = require('./config/session')
const passport = require('./config/passport')
const signUpValidators = require('./validators/signup.validator')
const { signup, updateMembership } = require('./controllers/auth.controller')
const protectedRoute = require('./middlewares/protectedRoute')
require('dotenv').config()


const PORT = process.env.PORT

const app = express()


app.set("views", path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session_middleware)
app.use(passport.initialize())
app.use(passport.session())

app.post('/sign-up', signUpValidators, signup)
app.get('/sign-up', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')
  res.render('sign-up', { errors: [], body: {} })
})

app.post('/membership', protectedRoute, updateMembership)
app.get('/membership', protectedRoute, (req, res) => {
  if (req.user.flag != 'visitor') return res.redirect('/');
  res.render('membership', {errors: []})
})

app.listen(PORT)