const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticleById,
  getArticles,
  getArticleCommentsById,
} = require("./controllers/articles.controllers");
const { getAllUsers } = require("./controllers/users.controllers");

app.get("/api", (request, response) => {
  response.status(200).send({ endpoints });
});

// GET Requests
app.get("/api/topics", getTopics);
app.get("/api/articles/:articleId", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:articleId/comments", getArticleCommentsById);

app.get("/api/users", getAllUsers);

module.exports = app;
