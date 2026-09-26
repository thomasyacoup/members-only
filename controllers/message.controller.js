const { validationResult } = require("express-validator")
const { createMessage, removeMessage, getMessage } = require("../models/message.model")
const createHttpError = require("http-errors")

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

const deleteMessage = async (req, res, next) => {
  try {
    const messageId = req.params.id
    const message = await getMessage(messageId)
    if (!message) throw createHttpError(404, 'Message not found')
    const userId = req.user.id
    if (message.author_id == userId || req.user.flag == 'admin') {
      await removeMessage(messageId)
      return res.redirect('/')
    }
    throw new createHttpError(403, 'You are not authorized to delete this message')
  } catch (err) {
    next(err)
  }
}

module.exports = { addMessage, deleteMessage }
