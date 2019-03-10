const User = require("../../modules/db/schemes/userScheme");

const getUserById = (req, res, next) => {
  const userId = req.params.id;

  const sendError = () => {
    res.status(400);
    res.json({
      status: "user not find!"
    });
  };

  const sendResponse = user => {
    console.log(user);
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success", user });
  };

  User.findById(userId)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getUserById;
