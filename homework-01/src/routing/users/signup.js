const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const buffer = new Buffer(
  "But still I'm having memories of high speeds when the cops crashed\n" +
    "As I laugh, pushin the gas while my Glocks blast\n" +
    "We was young and we was dumb but we had heart"
);

const saveUser = (pathDb, user, res) => {
  let resolveSuccess;
  fs.open(pathDb, "w", function(err, fd) {
    if (err) {
      throw "could not open file: " + err;
    }

    fs.write(fd, user, 0, user.length, null, function(err) {
      if (err) throw "error writing file: " + err;

      fs.close(fd, function() {
        fs.readFile(pathDb, function(err, data) {
          if (err) {
            return console.error(err);
          }

          resolveSuccess = {
            status: "success",
            user: JSON.parse(data)
          };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(resolveSuccess));
        });
      });
    });
  });
};

const signup = (req, res) => {
  if (req.method === "POST") {
    req.on("data", function(data) {
      let obj = JSON.parse(data);
      let buffer = new Buffer(JSON.stringify(obj));
      let pathDb = path.join(__dirname, "../../db/", `${obj.username}.json`);

      saveUser(pathDb, buffer, res);
    });
  }
};

module.exports = signup;
