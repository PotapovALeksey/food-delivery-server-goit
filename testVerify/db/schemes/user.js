const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");
const user = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false }
});

userSchema.plugin(timestamp);

const User = mongoose.model("User", user);

module.exports = User;
