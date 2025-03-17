const {
  fetchArticleById,
  fetchAllArticles,
  fetchArticleCommentsById,
  updateArticleVotes,
} = require("../models/articles.models");

exports.getArticleById = (request, response, next) => {
  const { articleId } = request.params;

  fetchArticleById(articleId)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (request, response, next) => {
  const { sort_by, order, author, topic } = request.query;

  fetchAllArticles(author, topic, sort_by, order)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleCommentsById = (request, response, next) => {
  const { articleId } = request.params;

  fetchArticleCommentsById(articleId)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleVotes = (request, response, next) => {
  const { articleId } = request.params;
  const { articleVotes } = request.body;

  updateArticleVotes(articleId, articleVotes)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
