const url = require("url");
const path = require("path");
const fs = require("fs");

const getId = url => {
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

const readFile = (id, src) => JSON.parse(fs.readFileSync(src));

const getProductId = (array, id) => array.find(el => Number(el.id) === id);

const sendProduct = (req, res) => {
  const parseUrl = url.parse(req.url).pathname;
  const id = Number(getId(parseUrl));
  const pathDb = path.join(__dirname, "../../", "db/all-products.json");

  const allProduct = readFile(id, pathDb);
  const idProduct = getProductId(allProduct, id);

  const responseBody = {
    status: "success",
    products: [idProduct]
  };

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(responseBody));
  res.end();
};

module.exports = sendProduct;
