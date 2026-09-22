const { body } = require("express-validator")

const messageValidator = [
  body('title')
    .trim()
    .isString()
    .withMessage('Title must be text.')
    .isLength({ max: 50 })
    .withMessage('Title cannot exceed 50 characters.')
    .notEmpty()
    .withMessage('title cannot be empty'),
  body('content')
    .trim()
    .isString()
    .withMessage('content must be text.')
    .notEmpty()
    .withMessage('content cannot be empty')
]

module.exports = messageValidator