const startServer = require("./src/server");
const { port, dataBaseUrl } = require("./src/config");
const connectDb = require("./src/modules/db/connect-db");
startServer.listen(port, () =>
  console.log("Example app listening on port " + port + "!")
);

connectDb(dataBaseUrl);


