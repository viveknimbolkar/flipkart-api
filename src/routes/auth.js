const router = require("express").Router();
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { Customer } = require("../model/user");
const nodemailer = require("nodemailer");
const { Seller } = require("../model/seller");

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome message to API.
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", async (req, res) => {
  res.send("welcome to flipkart-clone");
});

/**
 * @swagger
 * /customer/login:
 *   post:
 *     description: login the user
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/customer/login", async (req, res) => {
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

/**
 * @swagger
 * /seller/login:
 *   post:
 *     description: login the seller
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/seller/login", async (req, res) => {
  Seller.find({ email: req.body.email })
    .exec()
    .then((seller) => {
      if (seller.length < 1) {
        return res.status(401).json({
          message: "Invalid email or password!",
        });
      }

      // compare normal string
      if (req.body.password === seller[0].password) {
        const payload = {
          email: seller[0].email,
          name: seller[0].name,
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


/**
 * @swagger
 * /seller/register:
 *   post:
 *     description: register a new user
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/seller/register", async (req, res) => {
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

  const seller = new Seller(customerData);
  await seller.save();

  res.status(200).json({
    message: "seller registered successfully",
  });
  res.end();
});


/**
 * @swagger
 * /customer/register:
 *   post:
 *     description: register a new user
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/customer/register", async (req, res) => {
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
