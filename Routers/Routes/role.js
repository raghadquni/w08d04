const express = require("express");
const { createRole, getRole } = require("./../Controllers/role");
const roleRouter = express.Router();
const authentication = require("./../MiddleWare/authentication");
const authorization = require("./../MiddleWare/authorization")


roleRouter.post("/createRole" , authentication, authorization, createRole);
roleRouter.get("/getRole" , authentication, authorization, getRole);

module.exports = roleRouter;