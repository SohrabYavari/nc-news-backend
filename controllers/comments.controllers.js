const { insertComment } = require("../models/comments.models");

exports.postCommentByArticleId = (request, response) => {
  const { articleId } = request.params;
  const { username, body } = request.body;

  insertComment(articleId, username, body).then((comment) => {
    response.status(201).send({comment})
  })
};
