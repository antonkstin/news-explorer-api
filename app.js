// Подключение модулей npm
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

// Подключение своих модулей
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralizedError = require('./middlewares/centralized-error');
const limiter = require('./middlewares/limiter');

// Запуск
const { PORT, DB_PORT } = require('./config/config');

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

// CORS
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

// Подключение единого роутера
app.use(router);

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate(Joi)
app.use(errors());

// Централизированная обработка ошибок
app.use(centralizedError);

app.listen(PORT);
