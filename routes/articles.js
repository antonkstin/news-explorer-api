const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().uri(),
      image: Joi.string().required().uri()
    })
  }),
  createArticle);
router.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24)
    })
  }),
  deleteArticle);

module.exports = router;
