const path = require("path");
const fs = require("fs");
const pathDb = path.join(__dirname, "../../", "db/all-products.json");

const readFile = src => JSON.parse(fs.readFileSync(src));

const getProductsId = (array, ids) => array.filter(el => ids.includes(el.id));

const isValidQueryParams = (req, res, next) => {
  const { ids } = req.query;

  if (!ids) {
    res.set("Content-type", "application/json");
    res.status(400);
    res.json({
      status: "is valid query params!"
    });
  }

  next();
};

const getProducts = (req, res, next) => {
  const { ids } = req.query;

  const numbersIds = ids.split(",").map(el => Number(el));

  const allProducts = readFile(pathDb);
  const filterProducts = getProductsId(allProducts, numbersIds);
  const responseObj =
    filterProducts.length === 0
      ? {
          status: "no products",
          products: []
        }
      : {
          status: "success",
          products: filterProducts
        };

  res.set("Content-type", "application/json");
  res.status(200);
  res.json(responseObj)
};

module.exports = { isValidQueryParams, getProducts };
