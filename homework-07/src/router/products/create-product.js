const Product = require("../../modules/db/schemes/productScheme");

const createProduct = req => {
  const product = req.body;

  const productData = new Product({
    ...product
  });

  return productData;
};

const saveProduct = (req, res, next) => {
  const newProduct = createProduct(req);

  const sendError = () => {
    res.status(400);
    res.json({
      status: "product not saved!"
    });
  };

  const sendResponse = product => {
    console.log(product);
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success", product });
  };

  newProduct
    .save()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = saveProduct;
