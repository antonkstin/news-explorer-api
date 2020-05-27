const Article = require('../models/article');
const CustomError = require('../middlewares/error');

function getArticles(request, response, next) {
  Article.find({ owner: request.user._id })
    .then((articles) => response.send(articles))
    .catch(next);
}

function createArticle(request, response, next) {
  const {
    keyword, title, text, date, source, link, image
  } = request.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: request.user._id
  })
    .then((article) => {
      const articleWithoutOwner = article.toObject();
      delete articleWithoutOwner.owner;
      response.send(articleWithoutOwner);
    })
    .catch(next);
}

function deleteArticle(request, response, next) {
  Article.findById(request.params.id).select('+owner')
    .then((article) => {
      if (!article) {
        throw new CustomError('Статья не найдена', 404);
      }
      if (article.owner.toString() !== request.user._id) {
        throw new CustomError('Вы не можете удалять чужие статьи', 403);
      }
      return article;
    })
    .then((article) => {
      Article.remove(article)
        .then(() => response.send(article))
        .catch(next);
    })
    .catch(next);
}

module.exports = { getArticles, createArticle, deleteArticle };
