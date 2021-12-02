const express = require('express')

const  {addPost, getAllPost, getPost, deletePost ,updatePost, adminDeletePost, addLikes} = require('./../controllers/post')
const authentication = require("../MiddleWare/authentication");
const authorization = require("../MiddleWare/authorization");
const postRouter = express.Router()

postRouter.post("/addPost", authentication, addPost);
postRouter.get("/getAllPost", authentication,getAllPost);
postRouter.get("/post/:id", authentication ,getPost);
postRouter.put("/deletePost", authentication, deletePost);
postRouter.put("/adminDelete", authentication,authorization, adminDeletePost);
postRouter.put("/updatePost", authentication ,updatePost);
postRouter.post("/addLike/:post", authentication, addLikes);


module.exports = postRouter;

