const express = require("express");

const getProduct = require("./get-product");
const { getProducts } = require("./get-products");
const { isValidQueryParams } = require("./get-products");

const productsRouter = express.Router();

productsRouter
  .get("/:id", getProduct)
  .get("/", isValidQueryParams, getProducts);

module.exports = productsRouter;
