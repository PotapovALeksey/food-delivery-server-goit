const url = require("url");
const path = require("path");
const fs = require("fs");

const getProductFile = path => JSON.parse(fs.readFileSync(path));

const writeProductFile = (src, body) => {
  fs.writeFileSync(src, body);
};

const getId = url => {
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

const getProduct = (req, res) => {
  const parseUrl = url.parse(req.url).pathname;
  const pathDb = path.join(__dirname, "../../", "db/all-products.json");
  let body;
  const id = getId(parseUrl);
  const allProducts = getProductFile(pathDb);

  req
    .on("error", err => {
      console.error(err.stack);
    })
    .on("data", data => {
      allProducts.push(JSON.parse(data));
    })
    .on("end", () => {
      writeProductFile(pathDb, JSON.stringify(allProducts));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(allProducts));
      res.end();
      
    });
};

module.exports = getProduct;
