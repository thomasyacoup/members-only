const { body } = require("express-validator");
const { isUsernameTaken } = require("../models/user.model");

const signUpValidators = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.')
    .isString()
    .withMessage('Username must be text.')
    .isLength({ max: 50 })
    .withMessage('Username cannot exceed 50 characters.')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores.')
    .custom(async (username) => {
      const usernameTaken = await isUsernameTaken(username)
      if (usernameTaken) {
        throw new Error('This username is taken')
      }
    }),
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .isString()
    .withMessage('First name must be text.')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters.'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required.')
    .isString()
    .withMessage('Last name must be text.')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 5 })
    .withMessage('Password contain at least 5 characters.'),
  body('confirm_password')
    .notEmpty()
    .withMessage('Confirm password is required.')
    .custom((pw, { req }) => pw === req.body.password)
    .withMessage('Confirm password does not match.')
]

module.exports = signUpValidators