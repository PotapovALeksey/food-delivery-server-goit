const Product = require("../../modules/db/schemes/productScheme");

const saveProduct = function(err, product) {
  if (err) throw err;

  product.save();
};

const updateProduct = (req, res, next) => {
  const productId = req.params.id;
  const reqBody = req.body;
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

  Product.findByIdAndUpdate(
    productId,
    reqBody,
    { useFindAndModify: false },
    (err, product) => {
      if (err) {
        return sendError();
      }

      return Promise.resolve(product);
    }
  ).then(sendResponse);
};

module.exports = updateProduct;
