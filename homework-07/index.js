const startServer = require("./src/server");
const { port, dataBaseUrl } = require("./src/config");
const connectDb = require("./src/modules/db/connect-db");
startServer.listen(port, () =>
  console.log("Example app listening on port " + port + "!")
);
const jwt = require("jsonwebtoken");
// const payload = { name: "foo" };
// const token = jwt.sign(payload, "abcd", {
//   expiresIn: 60 * 60 * 24
// });
// console.log(token, "token");
// const verify = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzcyZTAwZjM3NjUzZjMyNTRjMDg3ZTgiLCJwYXNzd29yZCI6IjEyMTI0NTEyNTEyNCIsImlhdCI6MTU1MjIzMzk4NywiZXhwIjoxNTUyMzIwMzg3fQ.dPViI--jkK6GJgCe_5IBkvzoyONNVK6SNeJvrOZvr78", "SUPER_SECRET_KEY", (err, verify) => {
//   if (err) console.log("err", err);

//   console.log("verify", verify);
// });


connectDb(dataBaseUrl);
