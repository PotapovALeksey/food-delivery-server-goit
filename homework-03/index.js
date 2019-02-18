const startServer = require("./src/server");
const { port } = require("./src/config");

startServer.listen(port, () =>
  console.log("Example app listening on port " + port + "!")
);
