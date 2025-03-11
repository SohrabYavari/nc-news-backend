const {
  fetchArticleById,
  fetchAllArticles,
} = require("../models/articles.models");

exports.getArticleById = (request, response) => {
  const { articleId } = request.params;

  fetchArticleById(articleId).then((article) => {
    response.status(200).send({ article });
  });
};

exports.getArticles = (request, response) => {
  fetchAllArticles().then((articles) => {
    response.status(200).send({ articles });
  });
};
