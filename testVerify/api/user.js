const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../db/schemes/user");
const config = require("./../config");
router.post("/user", function(req, res, next) {
  const user = new User({
    user: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  const sendResponse = (res, user) => {
    res.set("Content-Type", "application/json");
    res.status = 200;
    res.end({ status: "success", user });
  };

  const sendError = () => {
    res.status(400);
    res.json({
      status: "user not saved!"
    });
  };

  user
    .save()
    .then(sendResponse)
    .catch(sendError);
});

router.get("/user", function(req, res, next) {
  if (!(req.headers["x-auth"] || req.query.token)) {
    return res.statusCode(401);
  }
  const token = req.headers["x-auth"] || req.query.token;
  try {
    const auth = jwt.decode(token, config.secret);
  } catch (err) {
    return res.sendStatus(401);
  }

  User.findOne({ username: auth.username }, (err, user) => {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
