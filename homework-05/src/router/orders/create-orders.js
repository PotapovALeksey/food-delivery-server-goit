const Order = require("../../modules/db/schemes/orderScheme");
const User = require("../../modules/db/schemes/userScheme");

const createOrder = req => {
  const order = req.body;

  return new Order({
    ...order
  });
};

const saveOrder = (req, res, next) => {
  const newOrder = createOrder(req);

  const saveOrderFromUser = async order => {
    const userId = order.creator;

    User.findById(userId)
      .then(user => {
        if (!user) return Promise.reject();

        const orderId = order._id;
        user.orders = [...user.orders, orderId];

        user.save().then(order);

        return Promise.resolve(order);
      })
      .catch(notFoundUser);
  };

  const notFoundUser = () => {
    res.status(400);
    res.json({
      status: "user not found!"
    });
  };

  const sendError = () => {
    res.status(400);
    res.json({
      status: "order not created!"
    });
  };

  const sendResponse = order => {
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success", order });
  };

  saveOrderFromUser(newOrder).then(
    data => {
      console.log("data", data);
    }
    // newOrder
    //   .save()
    //   .then(sendResponse)
    //   .catch(sendError)
  );
};

module.exports = saveOrder;
