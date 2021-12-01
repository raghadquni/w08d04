const express = require("express");
const userRouter = express.Router();
const { register, getUsers, login } = require("../Controllers/user");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


userRouter.post("/signup", register);
userRouter.get("/getUsers", getUsers , authentication, authorization);
userRouter.post("/login", login);

module.exports = userRouter;