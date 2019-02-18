const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

const createFolder = path => {
  return new Promise(resolve => {
    fs.mkdir(path, (err, folder) => {
      if (err) throw err;

      resolve(folder);
    });
  });
};

const ifUserName = (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody.name) {
    res.set("Content-type", "application/json");
    res.status(400);
    res.json({
      status: "no name"
    });
  }

  next();
};

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
  const pathDir = path.join(__dirname, "../../db/users", `${userUnique.id}`);
  const pathDb = path.join(
    __dirname,
    "../../db/users/",
    `${userUnique.id}`,
    `${reqBody.name}.json`
  );

  createFolder(pathDir)
    .then(writeFile(pathDb, JSON.stringify(userUnique)))
    .then(response(res, userUnique));
};

module.exports = { createUser, ifUserName };
