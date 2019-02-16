const defaultRes = (req, res) => {
  
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Hello WORLD");
  res.end();
};

module.exports = defaultRes;