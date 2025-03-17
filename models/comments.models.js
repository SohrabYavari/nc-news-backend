const db = require("../db/connection");
const { checkExists } = require("../utils/utils");

exports.insertComment = (articleId, username, body) => {
  return db
    .query(
      `
      INSERT INTO comments
      (article_id, author, body, created_at, votes)
      VALUES 
      ($1, $2, $3, CURRENT_TIMESTAMP, 0)
      RETURNING *
      `,
      [articleId, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteCommentById = (commentId) => {
  return checkExists("comments", "comment_id", commentId)
    .then(() => {
      return db.query(
        `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`,
        [commentId]
      );
    })
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return rows[0];
    });
};
