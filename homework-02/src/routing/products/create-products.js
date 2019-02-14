const url = require("url");

const getId = url => {
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

const getProduct = (req, res) => {
  const parseUrl = url.parse(req.url).pathname;

  const id = getId(parseUrl);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write("createProduct");
  res.end();
};

module.exports = getProduct;