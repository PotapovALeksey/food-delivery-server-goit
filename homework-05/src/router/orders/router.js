const express = require("express");
const createOrder = require("./create-orders");
const getOrderById = require("./get-order-byid");
const orderRouter = express.Router();

orderRouter.post("/", createOrder).get("/:id", getOrderById);

module.exports = orderRouter;
