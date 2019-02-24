const path = require("path");
const fs = require("fs");

const checkUser = path => fs.existsSync(path);

const isValidIdUser = (req, res, next) => {
  const id = req.params.id;

  const pathDir = path.join(__dirname, "../../", "db/users", `${id}`);

  if (!checkUser(pathDir)) {
    const responseObj = { status: "no user", users: [] };

    res.set("Content-type", "application/json");
    res.status(400);
    res.json(responseObj);
    return;
  }

  next();
};

const findUserFile = files => files.find(file => /json$/.test(file));

const readFile = (path, res) => {
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      resolve({ data, res });
    });
  });
};

const response = (...args) => {
  const { data, res } = args[0];

  const successUser = {
    status: "success",
    user: JSON.parse(data)
  };

  res.set("Content-type", "application/json");
  res.status(200);
  res.json(successUser);
};

const getUser = (req, res, next) => {
  const id = req.params.id;

  const pathDir = path.join(__dirname, "../../", "db/users", `${id}`);

  const fileName = findUserFile(fs.readdirSync(pathDir));

  const pathUserFile = path.join(
    __dirname,
    "../../",
    "db/users",
    `${id}`,
    `${fileName}`
  );

  readFile(pathUserFile, res).then(response);
};

module.exports = { isValidIdUser, getUser };
