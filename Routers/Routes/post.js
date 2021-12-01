const express = require('express')

const  {addPost, getAllPost, getPost} = require('./../controllers/post')
const authentication = require("../MiddleWare/authentication");
// const authorization = require("../MiddleWare/authorization");
const postRouter = express.Router()

postRouter.post("/addPost", authentication, addPost);
postRouter.get("/getAllPost", authentication, getAllPost);
postRouter.get("/posts/:id", authentication, getPost);


module.exports = postRouter;