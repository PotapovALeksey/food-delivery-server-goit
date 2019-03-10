const jwt = require("jsonwebtoken");
const secretKey = require("../../config").secret;

const getToken = req =>
  req.headers["x-access-token"] || req.query.token || req.body.token;

const checkToken = (req, res, next) => {
  const token = getToken(req);
  console.log("token", token);
  if (!token)
    return res.json({ success: "false", message: "no token provided" });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({
        success: "false",
        message: "failed to authenticate token"
      });
    }
   
    req.decoded = decoded;

    next();
  });

};

module.exports = checkToken;
