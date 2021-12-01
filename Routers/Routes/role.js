const express = require("express");
const { createRole, getRole } = require("./../Controllers/role");
const roleRouter = express.Router();
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization")


roleRouter.post("/createRole", createRole);
roleRouter.get("/getRole", getRole , authentication, authorization);

module.exports = roleRouter;