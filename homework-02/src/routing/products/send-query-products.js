const url = require("url");
const path = require("path");
const fs = require("fs");

const getProductFile = path => JSON.parse(fs.readFileSync(path));

const filterProduct = (arr, ids) => {
  return arr.filter(el => ids.includes(String(el.id)));
};

const getQueryId = url => {
  const indexOf = url.query.indexOf("=");

  if (indexOf !== -1) {
    const idString = url.query.slice(indexOf + 1).trim();
    const arrayId = idString.split(",");

    return arrayId;
  }

  return url;
};

const sendQueryProducts = (req, res) => {
  const parseUrl = url.parse(req.url);
  const pathDb = path.join(__dirname, "../../", "db/all-products.json");
  const responseObj = {};
  const ids = getQueryId(parseUrl);
  const allProducts = getProductFile(pathDb);
  const filtProducts = filterProduct(allProducts, ids);

  if (filtProducts.length > 0) {
    const newArray = filtProducts.reduce((acc, el) => {
      const { id, sku, name, description } = el;

      return (acc = [...acc, { id, sku, name, description }]);
    }, []);

    const responseBody = {
      status: "success",
      products: newArray
    };
    res.write(JSON.stringify(responseBody));
    res.end();
  } else {
    const responseBody = {
      status: "no products",
      products: []
    };

    res.write(JSON.stringify(responseBody));
    res.end();
  }

  res.writeHead(200, { "Content-Type": "application/json" });
};

module.exports = sendQueryProducts;
