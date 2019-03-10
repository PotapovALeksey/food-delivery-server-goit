const Product = require("../../modules/db/schemes/productScheme");

const getProductById = (req, res, next) => {
  const productId = req.params.id;

  const sendError = () => {
    res.status(400);
    res.json({
      status: "product not find!"
    });
  };

  const sendResponse = product => {
    console.log(product);
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success", product });
  };

  Product.findById(productId)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getProductById;
