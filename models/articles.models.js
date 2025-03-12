const db = require("../db/connection");

exports.fetchArticleById = (articleId) => {
  return db
    .query(
      `
      SELECT articles.article_id, articles.title, 
      articles.topic, articles.author, 
      articles.body, articles.votes, 
      articles.created_at, articles.article_img_url, 
      COUNT(comments.article_id) AS comment_count 
      FROM articles 
      LEFT JOIN comments ON articles.article_id = comments.article_id 
      WHERE articles.article_id = $1 GROUP BY articles.article_id`,
      [articleId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchAllArticles = (
  author,
  topic,
  sort_by = "created_at",
  order = "DESC"
) => {
  let queryStr = `
  SELECT articles.article_id, articles.title, articles.topic, articles.author, 
  articles.votes, articles.created_at, articles.article_img_url, 
  COUNT(comments.article_id) AS comment_count 
  FROM articles 
  LEFT JOIN comments ON articles.article_id = comments.article_id
  `;

  const queryValues = [];
  if (author) {
    queryStr += ` WHERE articles.author = $1`;
    queryValues.push(author);
  }
  if (topic) {
    queryStr += author
      ? ` AND articles.topic = $2`
      : ` WHERE articles.topic = $1`;
    queryValues.push(topic);
  }

  const validOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${validOrder};`;

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleCommentsById = (articleId) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateArticleVotes = (articleId, articleVotes) => {
  return db
    .query(
      `UPDATE articles 
      SET votes = votes + $1 
      WHERE article_id = $2 
      RETURNING *`,
      [articleVotes, articleId]
    )
    .then(({ rows }) => {
      return rows;
    });
};
