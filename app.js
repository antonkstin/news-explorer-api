// Подключение модулей npm
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');

// Подключение своих модулей
const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const auth = require('./middlewares/auth');
const { routerArticle, routerUser } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralizedError = require('./middlewares/centralized-error');
const NotFoundErr = require('./errors/not-found-err');
const limiter = require('./middlewares/limiter');

// Запуск
const { PORT, DB_PORT } = require('./config/config');/*
const { PORT = 3000, DB_PORT, NODE_ENV } = process.env; */
const app = express();

// Подключение к MongoDB
mongoose.connect(DB_PORT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

// Подключение parser'ов для приема данных
app.use(bodyParser.json());
app.use(cookieParser());

// Подключение rate-limiter'a
app.use(limiter);
app.use(helmet());

// Логгер запросов
app.use(requestLogger);

// Обработчики запросов +JOI
app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  signup);
app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signin);

// Защита авторизацией
app.use(auth);

// Обработчики запросов
app.use('/users/me', routerUser);
app.use('/articles', routerArticle);
app.use('*', () => {
  throw new NotFoundErr('Запрашиваемый ресурс не найден');
});

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate(Joi)
app.use(errors());

// Централизированная обработка ошибок
app.use(centralizedError);

app.listen(PORT);
