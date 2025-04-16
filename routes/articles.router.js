const express = require("express");
const articlesRouter = express.Router();

const {
  getArticleById,
  getArticles,
  getArticleCommentsById,
  patchArticleVotes,
} = require("../controllers/articles.controllers");
const {
  postCommentByArticleId,
} = require("../controllers/comments.controllers");

articlesRouter.get("/", getArticles);
articlesRouter.get("/:articleId", getArticleById);
articlesRouter.get("/:articleId/comments", getArticleCommentsById);
articlesRouter.patch("/:articleId", patchArticleVotes);
articlesRouter.post("/:articleId/comments", postCommentByArticleId);

module.exports = articlesRouter;
