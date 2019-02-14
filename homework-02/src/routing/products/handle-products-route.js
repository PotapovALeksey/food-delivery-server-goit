const sendProduct = require("./send-products");
const createProduct = require("./create-products");


const handleProductsRoute = (request, response) => {
  const reqMethod = request.method;
  
  if (reqMethod === "GET") {
    sendProduct(request, response);

    return;
  }

  if (reqMethod === "POST") {
    createProduct(request, response);
  }
};

module.exports = handleProductsRoute;
