const express = require("express");
const app = express();
const cors = require('cors')
const endpoints = require("./endpoints.json");

// topics controllers
const { getTopics } = require("./controllers/topics.controllers");

// articles controllers
const {
  getArticleById,
  getArticles,
  getArticleCommentsById,
  patchArticleVotes,
} = require("./controllers/articles.controllers");

// user controllers
const { getAllUsers } = require("./controllers/users.controllers");

// comment controllers
const {
  postCommentByArticleId,
  removeCommentById,
} = require("./controllers/comments.controllers")

// error controllers
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleRouteErrors,
} = require("./middleware/errorHandlers");
app.use(cors())

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
app.patch("/api/articles/:articleId", patchArticleVotes);

// COMMENTS - POST REQUEST
app.post("/api/articles/:articleId/comments", postCommentByArticleId);

// COMMENTS - DELETE REQUEST
app.delete("/api/comments/:commentId", removeCommentById);

// USERS - GET REQUESTS
app.get("/api/users", getAllUsers);


// ERROR HANDLERS
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleRouteErrors);
app.use(handleServerErrors);

module.exports = app;
