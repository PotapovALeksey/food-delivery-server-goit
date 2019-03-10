const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const usersRouter = require("./router/users/router");
const mainRouter = require("./router/main/router");
const productsRouter = require("./router/products/router");
const orderRouter = require("./router/orders/router");
const authenticate = require("./router/authenticate/login");
const verifyToken = require("./modules/middleware/checktoken");
const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use("/api/login", authenticate)
  .use(verifyToken)
  .use("/api/", mainRouter)
  .use("/api/users", usersRouter)
  .use("/api/products", productsRouter)
  .use("/api/orders", orderRouter)
  .use(errorHandler);

module.exports = app;
