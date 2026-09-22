const express = require('express')
const path = require('path')
const session_middleware = require('./config/session')
const passport = require('./config/passport')
const signUpValidators = require('./validators/signup.validator')
const { signup, updateMembership } = require('./controllers/auth.controller')
const protectedRoute = require('./middlewares/protectedRoute')
const { addMessage } = require('./controllers/message.controller')
const messageValidator = require('./validators/message.validator')
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

app.get('/', (req, res) => res.render('index', { req }))

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

app.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')
  res.render('login', { errors: [], body: {} })
})
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/new-message', protectedRoute, (req, res) => res.render('new-message', { errors: [], body: {} }))
app.post('/new-message', protectedRoute, messageValidator, addMessage)

app.listen(PORT)