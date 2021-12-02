const express = require("express");
const userRouter = express.Router();
const { register, getUsers, login , deleteUser} = require("../Controllers/user");

const authentication = require("../MiddleWare/authentication");
const authorization = require("../MiddleWare/authorization");


userRouter.post("/signup", register);
userRouter.get("/getUsers", authentication, authorization, getUsers); // admin token
userRouter.post("/login", login);
userRouter.put("/delete", authentication, authorization ,deleteUser); // admin token


module.exports = userRouter;