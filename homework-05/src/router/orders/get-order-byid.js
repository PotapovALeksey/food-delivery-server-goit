const Order = require("../../modules/db/schemes/orderScheme");

const getOrderById = (req, res, next) => {
  const orderId = req.params.id;

  const sendError = () => {
    res.status(400);
    res.json({
      status: "order not find!"
    });
  };

  const sendResponse = order => {
    console.log(order);
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: "success", order });
  };

  Order.findById(orderId)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getOrderById;
