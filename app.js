const express = require("express");
const app = express();
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
} = require("./middleware/errorHandlers");

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

app.all("*", (req, res, next) => {
  try{
    res.status(404).send({ msg: "Route not found" });
  }
  catch(err) {
    next(err)
  }
})


app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
