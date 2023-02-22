const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// main user schema
const seller = new Schema({
  name: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  product: [String],
});

const Seller = mongoose.model("Seller", seller);

module.exports = { Seller };
