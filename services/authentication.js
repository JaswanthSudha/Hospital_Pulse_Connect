const JWT = require('jsonwebtoken');

function createToken(user) {
  const secret = process.env.JWT_SECRET;
  const payload = {
    userId: user._id,
  }
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, process.env.JWT_SECRET);
  return payload;
}

module.exports = {
  createToken,
  validateToken
}