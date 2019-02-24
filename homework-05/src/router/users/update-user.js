const User = require("../../modules/db/schemes/userScheme");

const saveUser = function(err, user) {
  if (err) throw err;

  user.save();
};

const updateUser = (req, res, next) => {
  const userId = req.params.id;
  const reqBody = req.body;
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

  User.findByIdAndUpdate(
    userId,
    reqBody,
    { useFindAndModify: false },
    (err, user) => {
      if (err) {
        return sendError();
      }

      return Promise.resolve(user);
    }
  ).then(sendResponse);
};

module.exports = updateUser;
