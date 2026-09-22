const bcrypt = require('bcryptjs')

const isValidPassword = async (plain_pw, hash_pw) => {
  const result = await bcrypt.compare(plain_pw, hash_pw)
  return result;
}

module.exports = isValidPassword