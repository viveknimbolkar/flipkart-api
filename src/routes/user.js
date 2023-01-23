const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  res.send("welcome to flipkart-clone");
});

module.exports = router;
