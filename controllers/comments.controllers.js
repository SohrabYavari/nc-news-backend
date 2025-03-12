const { insertComment, deleteCommentById } = require("../models/comments.models");

exports.postCommentByArticleId = (request, response) => {
  const { articleId } = request.params;
  const { username, body } = request.body;

  insertComment(articleId, username, body).then((comment) => {
    response.status(201).send({comment})
  })
};


exports.removeCommentById = (request, response) => {
    const {commentId} = request.params

    deleteCommentById(commentId).then(() => {
        response.status(204).send()
    })
}