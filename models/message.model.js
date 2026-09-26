const pool = require("../config/db")

const createMessage = async (message, userId) => {
  const result = await pool.query(`\
    INSERT INTO messages (title, content, author_id) VALUES ($1, $2, $3) RETURNING *
  `, [message.title, message.content, userId])

  return result.rows[0]
} 

const getAllMessages = async () => {
  const result = await pool.query(`
    SELECT m.id, m.title, m.content, m.created_at, u.username AS author_name, m.author_id
    FROM messages m 
    JOIN users u ON u.id=m.author_id
  `)

  return result.rows
}

const getMessage = async (id) => {
  const result = await pool.query(`
    SELECT id, title, content, created_at, author_id
    FROM messages 
    WHERE id=$1
  `, [id])

  return result.rows[0]
}

const removeMessage = async (id) => {
  return await pool.query(`
    DELETE FROM messages
    WHERE id=$1
  `, [id])
}

module.exports = { createMessage, getAllMessages, removeMessage, getMessage }