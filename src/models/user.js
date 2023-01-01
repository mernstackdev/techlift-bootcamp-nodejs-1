//models

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  token: String,
  Blocked: false,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phone:{
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

const User = mongoose.model("customers", userSchema);

module.exports = User;
