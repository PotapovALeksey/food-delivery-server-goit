const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../../middleware/timestamp");
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name field is required!"]
  },
  telephone: String,
  password: {
    type: String,
    required: [true, "password field is required!"]
  },
  email: String,
  favoriteProducts: Array,
  viewedProducts: Array,
  orders: Array
});

userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);

module.exports = User;
