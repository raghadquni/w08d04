const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const { register, getUsers, login , deleteUser} = require("../Controllers/user");

const authentication = require("../MiddleWare/authentication");
const authorization = require("../MiddleWare/authorization");


userRouter.post("/signup", register);
userRouter.get("/getUsers", authentication,  getUsers); // admin token
userRouter.post("/login", login);
userRouter.put("/delete", authentication ,deleteUser); // admin token


module.exports = userRouter;