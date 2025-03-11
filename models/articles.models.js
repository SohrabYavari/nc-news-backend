const db = require("../db/connection");

exports.fetchArticleById = (articleId) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchAllArticles = () => {
  return db
    .query(`
      SELECT articles.article_id, title, topic, articles.author, articles.votes, articles.created_at, article_img_url, 
      COUNT(comments.article_id) AS comment_count 
      FROM articles RIGHT JOIN comments ON articles.article_id=comments.article_id 
      GROUP BY articles.article_id, title, topic, articles.author, articles.votes, articles.created_at, article_img_url ORDER BY articles.created_at ASC
      `)
    .then(({ rows }) => {
      return rows;
    });
};
