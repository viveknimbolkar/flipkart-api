const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// main user schema
const cart = new Schema({
  name: {
    require: true,
    type: String,
  },
  price: {
    require: true,
    type: String,
  },
  image: {
    require: true,
    type: String,
  },
  inStock: {
    require: true,
    type: String,
  },
  discount: {
    require: true,
    type: String,
  },
  originalPrice: {
    require: true,
    type: String,
  },
  flipkartAssured: {
    require: true,
    type: String,
  },
  sellerName: {
    require: true,
    type: String,
  },
});

const Cart = mongoose.model("Cart", cart);

module.exports = { Cart };
