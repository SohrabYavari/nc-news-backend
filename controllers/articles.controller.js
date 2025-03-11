const { fetchArticleById } = require("../models/articles.models");

exports.getArticleById = (request, response) => {
  const { articleId } = request.params;

  fetchArticleById(articleId).then((articles) => {
    response.status(200).send({ articles });
  });
};
