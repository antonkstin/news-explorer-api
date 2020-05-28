const Article = require('../models/article');
const NotFoundErr = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');

function getArticles(request, response, next) {
  Article.find({ owner: request.user._id })
    .then((articles) => response.send(articles))
    .catch(next);
}

function createArticle(request, response, next) {
  const {
    keyword, title, text, date, source, link, image,
  } = request.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: request.user._id,
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
        throw new NotFoundErr('Статья не найдена');
      }
      if (article.owner.toString() !== request.user._id) {
        throw new ForbiddenErr('Вы не можете удалять чужие статьи');
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
