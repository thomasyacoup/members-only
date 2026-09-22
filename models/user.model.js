const pool = require('../config/db')

const getUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username=$1', [username])
  return result.rows[0]
}

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id=$1', [id])
  return result.rows[0]
}

module.exports = { getUserByUsername, getUserById }