const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticleById,
  getArticles,
  getArticleCommentsById,
  patchArticleVotes
} = require("./controllers/articles.controllers");
const { getAllUsers } = require("./controllers/users.controllers");
const {
  postCommentByArticleId,
  removeCommentById,
} = require("./controllers/comments.controllers");

app.use(express.json());
app.get("/api", (request, response) => {
  response.status(200).send({ endpoints });
});

// TOPICS - GET REQUESTS
app.get("/api/topics", getTopics);

// ARTICLES - GET REQUESTS
app.get("/api/articles", getArticles);
app.get("/api/articles/:articleId", getArticleById);
app.get("/api/articles/:articleId/comments", getArticleCommentsById);

// ARTICLES - PATCH REQUESTS
app.patch('/api/articles/:articleId', patchArticleVotes)

// COMMENTS - POST REQUEST
app.post("/api/articles/:articleId/comments", postCommentByArticleId);

// COMMENTS - DELETE REQUEST
app.delete("/api/comments/:commentId", removeCommentById)


// USERS - GET REQUESTS
app.get("/api/users", getAllUsers);



module.exports = app;
