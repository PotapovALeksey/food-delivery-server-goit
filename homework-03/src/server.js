const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./router/users/router");
const mainRouter = require("./router/main/router");
const productsRouter = require("./router/products/router");
const orderRouter = require("./router/orders/router");
const imageRouter = require("./router/image/save-image");
const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/", mainRouter)
  .use("/users", usersRouter)
  .use("/products", productsRouter)
  .use("/orders", orderRouter)
  .use("/images", imageRouter)
  .use(errorHandler);

module.exports = app;
