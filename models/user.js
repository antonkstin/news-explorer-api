const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedErr = require('../errors/unauthorized-err');


const schemaUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });


schemaUser.statics.checkData = function checkData(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedErr('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((state) => {
          if (!state) {
            throw new UnauthorizedErr('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', schemaUser);

// Модель пользователя вместе с методом,
// который по переданным ему почтой и паролем
// проверяет их с базой данных и возвращает
// либо ошибку либо данные пользователя
