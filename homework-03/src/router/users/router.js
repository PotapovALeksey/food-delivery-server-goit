const express = require("express");
const { ifUserName } = require("./create-user");
const { createUser } = require("./create-user");
const { isValidIdUser } = require("./get-user");
const { getUser } = require("./get-user");

const usersRouter = express.Router();

usersRouter
  .get("/:id", isValidIdUser, getUser)
  .post("/", ifUserName, createUser);

module.exports = usersRouter;
