require('dotenv');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('./userService');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const genToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);

const isValidToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, jwtConfig);
  } catch (e) {
    return false;
  }
};

const getUserIdByToken = async (token) => {
  const { email } = isValidToken(token);
  const { id } = await findUserByEmail(email);
  return id;
};

module.exports = {
  genToken,
  isValidToken,
  getUserIdByToken,
};