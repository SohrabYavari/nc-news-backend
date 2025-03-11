const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticleById,
  getArticles,
  getArticleCommentsById,
} = require("./controllers/articles.controller");

app.get("/api", (request, response) => {
  response.status(200).send({ endpoints });
});

// GET Requests
app.get("/api/topics", getTopics);
app.get("/api/articles/:articleId", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:articleId/comments", getArticleCommentsById);

module.exports = app;
