const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../../middleware/timestamp");
const orderSchema = new Schema({
  creator: { type: String, required: true },
  productsList: Array,
  deliveryType: String,
  deliveryAdress: String,
  sumToPay: Number,
  status: {
    type: String,
    default: "inProgress"
  }
});

orderSchema.plugin(timestamp);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
