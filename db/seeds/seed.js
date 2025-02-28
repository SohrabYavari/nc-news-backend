const db = require("../connection");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../data/test-data/index");

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
    });
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
