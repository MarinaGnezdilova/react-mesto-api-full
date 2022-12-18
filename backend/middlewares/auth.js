const jwt = require('jsonwebtoken');
const Unauthoraized = require('../errors/unauthoraized');
require('dotenv').config();

const {secretKey = 'some-secret-key'} = process.env.SECRET_KEY;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthoraized('Что-то пошло не так.');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new Unauthoraized('Необходима авторизация.');
  }

  req.user = payload;

  next();
};
