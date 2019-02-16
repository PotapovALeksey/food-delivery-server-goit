const products = require("./products/products");
const signup = require("./users/signup");
const mainRoute = require("./main/default");
const handleProductsRoute = require("./products/handle-products-route");
const sendQueryProducts = require("./products/send-query-products")

const router = {
  "/products": handleProductsRoute,
  "/signup": signup,
  "/products/?ids": sendQueryProducts,
  default: mainRoute
};

module.exports = router;
