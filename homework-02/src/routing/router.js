const products = require("./products/products");
const signup = require("./users/signup");
const mainRoute = require("./main/default");

const router = {
  "/products": products,
  "/signup": signup,
  default: mainRoute
};

module.exports = router;