const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = fs.readFileSync;


const products = function(req, res) {
  const filePath = path.join(__dirname, "../../", "db/all-products.json");

  const data = readFile(filePath);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(data);
  res.end();
};

module.exports = products;
