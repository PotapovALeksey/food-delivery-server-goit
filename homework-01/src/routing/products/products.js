const path = require("path");
const fs = require("fs");

const products = function(req, res) {
  const filePath = path.join(__dirname, "../../", "db/all-products.json");

  fs.readFile(filePath, "utf-8", function(err, data) {
    if (err) throw err;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(data);
    res.end();
  });
};

module.exports = products;
