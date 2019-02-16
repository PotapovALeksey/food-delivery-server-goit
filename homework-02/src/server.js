const https = require("https");
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const router = require("./routing/router");
const getRouteHandler = require("./helpers/get-route-handler");
// const options = {
//   cert: fs.readFileSync("./certificate/server.crt"),
//   ca: fs.readFileSync("./certificate/server.csr"),
//   key: fs.readFileSync("./certificate/server.key"),
// };


const startServer = port => {
  const server = http
    .createServer((req, res) => {
      const parseUrl = url.parse(req.url);

      const func = getRouteHandler(router, parseUrl) || router.default;

      func(req, res);
    })
    .listen(port);

  return server;
};

module.exports = startServer;
