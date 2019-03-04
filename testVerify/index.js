const express = require("express");
const connectDb = require("./db/connect-db");
const { port, dataBaseUrl } = require("./config");
const app = express();

app.use(require("./api"));

const server = app.listen(port, function() {
  console.log("Server up and running in %d ", server.address().port);
});

connectDb(dataBaseUrl);
