const Product = require("../../modules/db/schemes/productScheme");

const deleteProduct = (req, res, next) => {
  const productId = req.params.id;

  const sendError = () => {
    res.status(400);
    res.json({
      status: "product not find!"
    });
  };

  const sendResponse = user => {
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success" });
  };

  Product.findById(productId)
    .deleteOne()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = deleteProduct;
