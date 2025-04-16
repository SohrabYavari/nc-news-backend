const express = require("express");
const apiRouter = express.Router();
const endpoints = require("../endpoints.json");

const articlesRouter = require("./articles.router");
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.router");
const commentsRouter = require("./comments.router");

// Root endpoint
apiRouter.get("/", (req, res) => {
  return res.status(200).send({ endpoints });
});

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
