const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const CustomError = require('./error');

function auth(request, response, next) {
  const token = request.cookies.jwt;
  let payload;
  if (!token) {
    throw new CustomError('Необходима авторизация', 401);
  }
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'сaesars-cipher'
    );
  } catch (err) {
    throw new CustomError('Необходима авторизация', 401);
  }
  request.user = payload;
  next();
}

module.exports = auth;

// Функция авторизации, которая берет из кук
// токен и елси его нет или он неверный, возвращает
// ошибку. А если все хорошо, то в запрос записывает
// объект с _id пользователя, который вошел
