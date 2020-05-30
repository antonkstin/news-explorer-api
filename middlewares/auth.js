const jwt = require('jsonwebtoken');

/* const { NODE_ENV, JWT_SECRET } = process.env; */
const { JWT_SECRET } = require('../config/config');
const UnauthorizedErr = require('../errors/unauthorized-err');

function auth(request, response, next) {
  const token = request.cookies.jwt;
  let payload;
  if (!token) {
    throw new UnauthorizedErr('Необходима авторизация');
  }
  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    throw new UnauthorizedErr('Необходима авторизация');
  }
  request.user = payload;
  next();
}

module.exports = auth;

// Функция авторизации, которая берет из кук
// токен и елси его нет или он неверный, возвращает
// ошибку. А если все хорошо, то в запрос записывает
// объект с _id пользователя, который вошел
