const products = require("./products/products");
const signup = require("./users/signup");
const mainRoute = require("./main/default");
const handleProductsRoute = require("./products/handle-products-route");

const router = {
  "/products": handleProductsRoute,
  "/signup": signup,
  default: mainRoute
};

module.exports = router;
