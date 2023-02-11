const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// address schema
const review = new Schema({
  title: {
    require: true,
    type: String,
  },
  rating: {
    require: true,
    type: String,
  },
  shortReview: {
    require: true,
    type: String,
  },
  longReview: {
    require: true,
    type: String,
  },
  customerName: {
    require: true,
    type: String,
  },
  dateOfReview: {
    require: true,
    type: String,
  },
  productImage: {
    require: true,
    type: String,
  },
});

const Reviews = mongoose.model("Review", review);

module.exports = { Reviews };
