const express = require("express");
const updateUser = require("./update-user");
const saveUser = require("./create-user");
const getUserById = require("./get-user-byId");
const getAllUsers = require("./get-all-users");
const deleteUser = require("./delete-user");
const usersRouter = express.Router();

usersRouter
  .get("/", getAllUsers)
  .get("/:id", getUserById)
  .post("/", saveUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);
  
module.exports = usersRouter;
