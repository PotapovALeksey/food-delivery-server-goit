const User = require("../../modules/db/schemes/userScheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("../../config").secret;

const errorResp = {
  success: false,
  message: "Authentication failed."
};

const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);

const authenticate = (req, res) => {
  const userId = req.body.id;
  const password = req.body.password;

  User.findById(userId, onFind);

  function onFind(err, user) {
    if (err) throw err;

    if (!user || !checkPassword) {
      return res.json(errorResp);
    }

    const payload = {
      userId,
      password
    };

    const token = jwt.sign(payload, secretKey , {
      expiresIn: 60 * 60 * 24
    })

    res.json({
      success: true,
      message:'Enjoy your token!',
      token: token
    })
  }
};

module.exports = authenticate;
