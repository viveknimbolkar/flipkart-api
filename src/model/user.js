const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// user schema
const customer = new Schema({
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
});

const Customer = mongoose.model("Customer", customer);

module.exports = { Customer };
