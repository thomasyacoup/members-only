const { body } = require("express-validator");
const { isUsernameTaken } = require("../models/user.model");

const signUpValidators = [
  body('username')
    .trim()
    .isString()
    .withMessage('Username must be text.')
    .isLength({ max: 50 })
    .withMessage('Username cannot exceed 50 characters.')
    .custom(async (username) => {
      const usernameTaken = await isUsernameTaken(username)
      if (usernameTaken) {
        throw new Error('This username is taken')
      }
    }),
  body('first_name')
    .trim()
    .isString()
    .withMessage('First name must be text.')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters.'),
  body('last_name')
    .trim()
    .isString()
    .withMessage('Last name must be text.')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters.'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password contain at least 5 characters.'),
  body('confirm_password')
    .custom((pw, { req }) => pw === req.body.password)
    .withMessage('Confirm password does not match.')
]

module.exports = signUpValidators