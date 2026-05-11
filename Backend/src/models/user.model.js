const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already existed"],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "account already existed with this email ID"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
