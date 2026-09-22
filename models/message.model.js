const pool = require("../config/db")

const createMessage = async (message, userId) => {
  const result = await pool.query(`\
    INSERT INTO messages (title, content, author_id) VALUES ($1, $2, $3) RETURNING *
  `, [message.title, message.content, userId])

  return result.rows[0]
} 

module.exports = { createMessage }