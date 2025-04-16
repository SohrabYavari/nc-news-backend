const db = require("../db/connection");
const { checkExists } = require("../utils/utils");

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
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article not found",
        });
      }
      return rows[0];
    });
};

exports.fetchAllArticles = (
  author,
  topic,
  sort_by = "created_at",
  order = "DESC"
) => {
  const allowedSortByColumns = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];

  if (!allowedSortByColumns.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid query input",
    });
  }

  // checks to see if authors or topics exist:
  const authorCheck = author
    ? checkExists("users", "username", author)
    : Promise.resolve();
  const topicCheck = topic
    ? checkExists("topics", "slug", topic)
    : Promise.resolve();

  return Promise.all([authorCheck, topicCheck])
    .then(() => {
      // Base Query
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
      return db.query(queryStr, queryValues);
    })
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchArticleCommentsById = (articleId) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      return rows;
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
      return rows[0];
    });
};
