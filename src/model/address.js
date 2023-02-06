const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// address schema
const address = new Schema({
  name: {
    require: true,
    type: String,
  },
  mobile: {
    require: true,
    type: String,
  },
  alternateMobile: {
    require: true,
    type: String,
  },
  pincode: {
    require: true,
    type: String,
  },
  address: {
    require: true,
    type: String,
  },
  locality: {
    require: true,
    type: String,
  },
  city: {
    require: true,
    type: String,
  },
  state: {
    require: true,
    type: String,
  },
  landmark: {
    require: true,
    type: String,
  },
  addressType: {
    require: true,
    type: String,
  },
});

const Address = mongoose.model("Address", address);

module.exports = { Address };
