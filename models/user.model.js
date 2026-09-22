const pool = require('../config/db')

const getUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username=$1', [username])
  return result.rows[0]
}

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id=$1', [id])
  return result.rows[0]
}

const createUser = async (user) => {
  const {
    username,
    pw_hash,
    first_name,
    last_name,
  } = user;

  const result = await pool.query('\
    INSERT INTO users (username, pw_hash, first_name, last_name) VALUES ($1, $2, $3, $4)\
    RETURNING *\
  ', [username, pw_hash, first_name, last_name])

  return result.rows[0]
}

const isUsernameTaken = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username=$1', [username])
  if (result.rows[0]) return true
  return false
}

const updateUserMembership = async (id, membership) => {
  await pool.query('\
    UPDATE users SET flag=$1 WHERE id=$2\
  ', [membership, id])
}

module.exports = { getUserByUsername, getUserById, createUser, isUsernameTaken, updateUserMembership }