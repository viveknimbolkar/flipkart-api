const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// address schema
const notification = new Schema({
  title: {
    require: true,
    type: String,
  },
  date: {
    require: true,
    type: String,
  },
  thumbnail: {
    require: true,
    type: String,
  },
  expiryTime: {
    require: true,
    type: String,
  },
});

const Notification = mongoose.model("Notification", notification);

module.exports = { Notification };
