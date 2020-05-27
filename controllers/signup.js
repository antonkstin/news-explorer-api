const bcrypt = require('bcryptjs');
const User = require('../models/user');

function signup(request, response, next) {
  const { email, password, name } = request.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      response.send(userWithoutPassword);
    })
    .catch(next);
}

module.exports = signup;

// Взял данные из тела запроса. Пароль захешировал с солью.
// Вернул пользователю созданные данные в базе без пароля.
