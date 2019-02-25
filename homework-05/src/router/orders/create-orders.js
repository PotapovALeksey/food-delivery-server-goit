const Order = require("../../modules/db/schemes/orderScheme");
const User = require("../../modules/db/schemes/userScheme");

const saveOrderFromUser = async order => {
  User.findById(order.creator)
    .then(user => {
      const orderId = order._id;
      user.orders = [...user.orders, orderId];
      console.log("user", user);
      return Promise.resolve(user);
    })
    .save()
    .catch(notFoundUser);
};
const createOrder = req => {
  const order = req.body;

  return new Order({
    ...order
  });
};

const saveOrder = (req, res, next) => {
  const newOrder = createOrder(req);

  const sendError = () => {
    res.status(400);
    res.json({
      status: "order not created!"
    });
  };
  const notFoundUser = () => {
    res.status(400);
    res.json({
      status: "user not found!"
    });
  };
  const sendResponse = order => {
    console.log("order", order);
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success", order });
  };

  saveOrderFromUser(newOrder).then(
    newOrder
      .save()
      .then(sendResponse)
      .catch(sendError)
  );
};

module.exports = saveOrder;
