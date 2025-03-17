const {
  insertComment,
  deleteCommentById,
} = require("../models/comments.models");

exports.postCommentByArticleId = (request, response, next) => {
  const { articleId } = request.params;
  const { username, body } = request.body;

  insertComment(articleId, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeCommentById = (request, response, next) => {
  const { commentId } = request.params;

  deleteCommentById(commentId)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
