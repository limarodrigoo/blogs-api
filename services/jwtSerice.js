require('dotenv');
const jwt = require('jsonwebtoken');

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

module.exports = {
  genToken,
  isValidToken,
};