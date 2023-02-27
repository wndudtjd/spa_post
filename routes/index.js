const express = require("express");
const postsRouter = require("./posts");
// const commentsRouter = require("./comments");

const routes = express.Router();

routes.use('/posts', postsRouter);
// routes.use('/comments', commentsRouter);

module.exports = routes;