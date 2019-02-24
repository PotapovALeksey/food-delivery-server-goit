const path = require("path");
const fs = require("fs");

const checkUser = path => fs.existsSync(path);

const isValidIdUser = (req, res, next) => {
  const id = req.body.user;

  const pathDir = path.join(__dirname, "../../", "db/users", `${id}`);

  if (!checkUser(pathDir)) {
    const responseObj = { status: "no user" };

    res.set("Content-type", "application/json");
    res.status(400);
    res.json(responseObj);
    return;
  }

  next();
};

module.exports = isValidIdUser;
