const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const signup = require('../controllers/signup');
const signin = require('../controllers/signin');
const auth = require('../middlewares/auth');
const deleteCookie = require('../controllers/cookie');
const routerUser = require('./users');
const routerArticle = require('./articles');
const NotFoundErr = require('../errors/not-found-err');

router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  signup);

router.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signin);

// Защита авторизацией
router.use(auth);

router.delete('/cookie', deleteCookie);

// Обработчики запросов
router.use('/users/me', routerUser);
router.use('/articles', routerArticle);
router.use('*', () => {
  throw new NotFoundErr('Запрашиваемый ресурс не найден');
});

module.exports = router;
