const express = require("express");
const { addComment } = require("../controllers/comment");
const authentication = require("../MiddleWare/authentication");
const commentRouter = express.Router();


commentRouter.post("/comment", authentication, addComment);

module.exports = commentRouter;
