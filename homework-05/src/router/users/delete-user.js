const User = require("../../modules/db/schemes/userScheme");

const deleteUser = (req, res, next) => {
  const userId = req.params.id;

  const sendError = () => {
    res.status(400);
    res.json({
      status: "user not find!"
    });
  };

  const sendResponse = user => {
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success" });
  };

  User.findById(userId)
    .deleteOne()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = deleteUser;
