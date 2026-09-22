const { validationResult } = require("express-validator")
const { createMessage } = require("../models/message.model")

const addMessage = async (req, res, next) => {
  const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.render('new-message', {
        body: req.body,
        errors: validationErrors.array()
      })
    }

  try {
    const {
      title,
      content
    } = req.body

    await createMessage({title, content}, req.user.id)
    res.redirect('/')
  } catch(e) {
    next(e)
  }
}

module.exports = { addMessage }