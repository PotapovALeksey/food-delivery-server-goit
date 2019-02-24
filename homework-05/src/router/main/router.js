const express = require("express");
const mainRoute = require("./main");

mainRouter = express.Router();

mainRouter.get("/", mainRoute);

module.exports = mainRouter;
