const User = require("../../modules/db/schemes/userScheme");

const getAllUsers = (req, res, next) => {
  const sendError = () => {
    res.status(400);
    res.json({
      status: "collection not find!"
    });
  };

  const sendResponse = users => {
    console.log(users);
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success", users });
  };

  User.find()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getAllUsers;
