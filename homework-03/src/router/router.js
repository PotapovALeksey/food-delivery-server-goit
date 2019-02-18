const express = require("express");
const mainRoute = require("./main/main");
const getProduct = require("./products/get-product");
const getProducts = require("./products/get-products");
const createUser = require("./users/create-user");

const router = express.Router();

router
  .get("/", mainRoute)
  .get("/products/:id", getProduct)
  .get("/products/ids:id", getProducts)
  .post("/users", createUser);


  module.exports = router;
