const router = require("express").Router();
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { Customer } = require("../model/user");
const nodemailer = require("nodemailer");

router.get("/", async (req, res) => {
  res.send("welcome to flipkart-clone");
});

router.post("/login", async (req, res) => {
  Customer.find({ email: req.body.email })
    .exec()
    .then((customer) => {
      if (customer.length < 1) {
        return res.status(401).json({
          message: "Invalid email or password!",
        });
      }

      // compare normal string
      if (req.body.password === customer[0].password) {
        const payload = {
          email: customer[0].email,
          name: customer[0].name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(200).json({
          message: "login successful",
          token: token,
        });
      }
      // store passwords with encryption
      // bcrypt.compare(req.body.password, customer[0].password, (err, result) => {
      //   console.log(result);
      //   if (!result) {
      //     res.status(401).json({
      //       message: "Incorrect email or password",
      //     });
      //   }
      //   if (result) {
      //     const payload = {
      //       email: customer[0].email,
      //       name: customer[0].name,
      //     };
      //     const token = jwt.sign(payload, process.env.JWT_SECRET);

      //     res.status(200).json({
      //       message: "login successful",
      //       token: token,
      //     });
      //   }
      // });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "server unreachable",
      });
      res.end();
    });
});

router.post("/register", async (req, res) => {
  var { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.json({
      message: "Empty fields are not allowed",
    });
    res.end();
  }

  const customerData = {
    name: name,
    email: email,
    password: password,
  };

  const customer = new Customer(customerData);
  await customer.save();

  res.status(200).json({
    message: "user registered successfully",
  });
  res.end();
});

module.exports = router;
