const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

const response = (res, user) => {
  const successUser = {
    status: "success",
    user: user
  };

  res.set("Content-type", "application/json");
  res.status(200);
  res.json(successUser);
};

const createUser = (req, res, next) => {
  const reqBody = req.body;

  const userUnique = {
    id: Date.now(),
    ...reqBody
  };
  const pathDb = path.join(__dirname, "../../db/", `all-users.json`);

  const users = JSON.parse(fs.readFileSync(pathDb));

  const newUsers = JSON.stringify([...users, userUnique]);

  writeFile(pathDb, newUsers).then(response(res,userUnique));
};

module.exports = createUser;
