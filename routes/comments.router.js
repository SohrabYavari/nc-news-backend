// routes/comments.router.js
const express = require("express");
const commentsRouter = express.Router();
const { removeCommentById } = require("../controllers/comments.controllers");

commentsRouter.delete("/:commentId", removeCommentById);

module.exports = commentsRouter;
