const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");
const userTest = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false }
});

userSchema.plugin(timestamp);

const UserTest = mongoose.model("UserTest", userTest);

module.exports = UserTest;
