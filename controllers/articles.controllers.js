const {
  fetchArticleById,
  fetchAllArticles,
  fetchArticleCommentsById,
} = require("../models/articles.models");

exports.getArticleById = (request, response) => {
  const { articleId } = request.params;

  fetchArticleById(articleId).then((article) => {
    response.status(200).send({ article });
  });
};

exports.getArticles = (request, response) => {
  const { sort_by, order, author, topic } = request.query;

  fetchAllArticles(author, topic, sort_by, order).then((articles) => {
    response.status(200).send({ articles });
  });
};

exports.getArticleCommentsById = (request, response) => {
  const { articleId } = request.params;

  fetchArticleCommentsById(articleId).then((comments) => {
    response.status(200).send({ comments });
  });
};
