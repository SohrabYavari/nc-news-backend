const db = require("../db/connection");

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
  return db
    .query(
      `
      DELETE FROM comments 
      WHERE comment_id = $1`,
      [commentId]
    )
    .then(({ rows }) => {
        return rows[0]
    });
};
