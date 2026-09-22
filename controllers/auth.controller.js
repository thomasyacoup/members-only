const { validationResult } = require("express-validator")
const { createUser } = require("../models/user.model")
const bcrypt = require('bcryptjs')

const signup = async (req, res, next) => {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    return res.render('sign-up', {
      body: req.body,
      errors: validationErrors.array()
    })
  }
  
  try {
    const {
      username,
      password,
      first_name,
      last_name,
    } = req.body

    const pw_hash = await bcrypt.hash(password, 10)
    
    const user = await createUser({
      username,
      pw_hash, 
      first_name,
      last_name
    })

    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/membership')
    });

  } catch(e) {
    next(e)
  }
}

module.exports = { signup }