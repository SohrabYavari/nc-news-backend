const db = require("../connection");
const format = require("pg-format");
const { createRefObject, convertTimestampToDate } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return createTopics();
    })
    .then(() => {
      return createUsers();
    })
    .then(() => {
      return createArticles();
    })
    .then(() => {
      return createComments();
    })
    .then(() => {
      const topicsMapped = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const topicReformat = format(
        `INSERT INTO topics (slug, description, img_url) 
          VALUES %L RETURNING *`,
        topicsMapped
      );
      return topicReformat;
    })
    .then((topicReformat) => {
      return db.query(topicReformat);
    })
    .then(() => {
      const usersMapped = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });

      const userReformat = format(
        `INSERT INTO users
        (username, name, avatar_url)
        VALUES %L RETURNING *
        `,
        usersMapped
      );
      return userReformat;
    })
    .then((userReformat) => {
      return db.query(userReformat);
    })
    .then(() => {
      const articlesMapped = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          convertTimestampToDate(article).created_at,
          article.votes,
          article.article_img_url,
        ];
      });
      const articleReformat = format(
        `
        INSERT INTO articles
        (title, topic, author, body, created_at, votes, article_img_url)
        VALUES %L RETURNING *
        `,
        articlesMapped
      );

      return db.query(articleReformat);
      
    })
    .then(({rows}) => {
      const commentsRef = createRefObject(rows, 'title', 'article_id')
      console.log(commentsRef)
      const commentsMapped = commentData.map((comment) => {
        return [
          commentsRef[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          convertTimestampToDate(comment).created_at,
        ];
      });

      const commentReformat = format(
        `INSERT INTO comments
        (article_id, body, votes, author, created_at)
        VALUES %L RETURNING *
        `, commentsMapped
      )
      return db.query(commentReformat)  
    }).then(({rows}) => {
      console.log(rows)
    })
  
};

function createTopics() {
  return db.query(`
  CREATE TABLE topics (
  slug VARCHAR(256) PRIMARY KEY NOT NULL,
  description VARCHAR(256) NOT NULL,
  img_url VARCHAR(1000) NOT NULL  
  )`);
}

function createUsers() {
  return db.query(`
  CREATE TABLE users (
  username VARCHAR(256) PRIMARY KEY NOT NULL,
  name VARCHAR(256) NOT NULL,
  avatar_url VARCHAR(1000) NOT NULL  
  )`);
}

function createComments() {
  return db.query(`
  CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  article_id INT REFERENCES articles(article_id),
  body TEXT NOT NULL,
  votes INT,
  author VARCHAR(256) REFERENCES users(username),
  created_at TIMESTAMP
  )`);
}

function createArticles() {
  return db.query(`
  CREATE TABLE articles (
  article_id SERIAL PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  topic VARCHAR(256) REFERENCES topics(slug),
  author VARCHAR(256) REFERENCES users(username),
  body TEXT NOT NULL,
  created_at TIMESTAMP,
  votes INT,
  article_img_url VARCHAR(1000) NOT NULL
  )`);
}

module.exports = seed;
