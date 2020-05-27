// Подключение модулей npm
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

// Подключение своих модулей
const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const auth = require('./middlewares/auth');
const getUser = require('./controllers/get-user');
const routerArticle = require('./routes/articles');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralizedError = require('./middlewares/centralized-error');

// Запуск
const { PORT = 3000 } = process.env;
const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
});

// Подключение parser'ов для приема данных
app.use(bodyParser.json());
app.use(cookieParser());

// Логгер запросов
app.use(requestLogger);

// Обработчики запросов +JOI
app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30)
    })
  }),
  signup);
app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8)
    })
  }),
  signin);

// Защита авторизацией
app.use(auth);

// Обработчики запросов
app.get('/users/me', getUser);
app.use('/articles', routerArticle);
app.use('*', (request, response) => {
  response.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate(Joi)
app.use(errors());

// Централизированная обработка ошибок
app.use(centralizedError);

app.listen(PORT);
