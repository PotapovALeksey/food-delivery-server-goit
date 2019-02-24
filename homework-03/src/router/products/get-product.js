const path = require("path");
const fs = require("fs");

const pathDb = path.join(__dirname, "../../", "db/all-products.json");

const readFile = src => JSON.parse(fs.readFileSync(src));

const getProductId = (array, id) => array.find(el => Number(el.id) === id);

const getProduct = (req, res, next) => {
  const id = Number(req.params.id);
  const allProducts = readFile(pathDb);
  const product = getProductId(allProducts, id);

  const responseObj = product
    ? { "status": "success", "products": [product] }
    : { "status": "no products", "products": [] };


    res.set( "Content-type", "application/json");
    res.status(200);
    res.json(responseObj)
};

module.exports = getProduct;
