const express = require("express");
const { addComment , deleteComment, getComment, deleteCommentFromAdmin, updateComment} = require("../controllers/comment");
const authorization = require("../MiddleWare/authorization");
const authentication = require("../MiddleWare/authentication");
const commentRouter = express.Router();


commentRouter.post("/comment", authentication, addComment);
commentRouter.put("/deleteComment/:post/:comment",authentication , deleteComment);
commentRouter.get("/getcomment", authentication ,getComment);
commentRouter.put("/deleteCommentAdmin/:post/:comment", authentication , authorization, deleteCommentFromAdmin);
commentRouter.put("/updateComment/:post/:commentID", authentication ,updateComment);


module.exports = commentRouter;
