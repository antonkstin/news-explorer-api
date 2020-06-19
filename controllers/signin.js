const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = require('../config/config');/*
const { NODE_ENV, JWT_SECRET } = process.env; */

function signin(request, response, next) {
  const { email, password } = request.body;

  User.checkData(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      response.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        domain: '',
      });
      response.send(user);
    })
    .catch(next);
}

module.exports = signin;

// Функция входа в систему проверяет переданные её почту и пароль
// Если такой пользователь есть и данные для входа он ввел
// правильные, то создаётся токен на 7 дней, который отправляется ему и
// сохраняется в куках
