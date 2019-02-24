const Product = require("../../modules/db/schemes/productScheme");

const getAllProduct = (req, res, next) => {
  const sendError = () => {
    res.status(400);
    res.json({
      status: "collection not find!"
    });
  };

  const sendResponse = products => {
    console.log(products);
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success", products });
  };

  Product.find()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getAllProduct;
