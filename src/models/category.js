//models

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  Blocked: false,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("category", userSchema);

module.exports = Category;
