const express = require("express");
const isValidIdUser = require("./check-valid-user");
const createOrder = require("./create-orders");

const orderRouter = express.Router();

orderRouter.post("/", isValidIdUser, createOrder);

module.exports = orderRouter;
