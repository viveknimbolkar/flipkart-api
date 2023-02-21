const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { Cart } = require("../model/cart");
const { Customer } = require("../model/user");

// verify the user geneiun request
const verifyUser = (req, res, next) => {
  var token = req.headers.authorization;
  if (token) {
    const verifyIdentity = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyIdentity) {
      next();
    } else {
      res.status(400).json({ msg: "Unauthorized request" });
    }
  } else {
    res.status(400).json({ msg: "Unauthorized request" });
  }
};

/**
 * @swagger
 * /add_address:
 *   post:
 *     description: add address to the specific user
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: mobile
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name:alternate_mobile
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: pincode
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: locality
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: address_type
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: landmark
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/add_address", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const {
    name,
    mobile,
    alternate_mobile,
    pincode,
    address,
    locality,
    address_type,
    city,
    state,
    landmark,
  } = req.body;
  if (
    !name ||
    !mobile ||
    !alternate_mobile ||
    !pincode ||
    !address ||
    !locality ||
    !address_type ||
    !city ||
    !state ||
    !landmark
  ) {
    res.status(400).json({ message: "empty fields are not allowed" });
  }
  const newAddress = {
    name: name,
    mobile: mobile,
    alternateMobile: alternate_mobile,
    pincode: pincode,
    address: address,
    locality: locality,
    addressType: address_type,
    city: city,
    state: state,
    landmark: landmark,
  };

  const filter = { email: token.email };
  const updateAddress = {
    $push: {
      address: newAddress,
    },
  };
  const addNewAddress = await Customer.updateOne(filter, updateAddress);
  if (addNewAddress) {
    res.status(200).json({ message: "address added successfully" });
  } else {
    res.status(500).json({ message: "something went wrong! try again later" });
  }
});

/**
 * @swagger
 * /get_customer_gender:
 *   post:
 *     description: Remove cart items of specific user
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/get_customer_gender", async (req, res) => {
  var token = req.headers.authorization;
  const verifyIdentity = jwt.verify(token, process.env.JWT_SECRET);
  const email = jwt.decode(token).email;
  if (verifyIdentity) {
    Customer.findOne({ email: email })
      .exec()
      .then((customer) => {
        res.status(200).json({
          name: customer.gender,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

/**
 * @swagger
 * /update_customer_gender:
 *   post:
 *     description: update customer gender
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/update_customer_gender", async (req, res) => {
  var { gender, email } = req.body;
  console.log(gender, email);
  if (!gender || !email) {
    res.json({
      message: "Empty fields are not allowed",
    });
    res.end();
  }

  const filter = { email: email };
  const updateDoc = {
    $set: {
      gender: gender,
    },
  };
  const result = await Customer.updateOne(filter, updateDoc);
  res.status(200).json({
    message: "gender updated successfully",
  });
  res.end();
});


/**
 * @swagger
 * /update_customer_gender:
 *   post:
 *     description: get customer name
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/get_customer_name", async (req, res) => {
  var token = req.headers.authorization;
  const verifyIdentity = jwt.verify(token, process.env.JWT_SECRET);
  const email = jwt.decode(token).email;
  if (verifyIdentity) {
    Customer.findOne({ email: email })
      .exec()
      .then((customer) => {
        res.status(200).json({
          name: customer.name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

router.post("/update_customer_name", async (req, res) => {
  var { name, email } = req.body;
  console.log(name, email);
  if (!name || !email) {
    res.json({
      message: "Empty fields are not allowed",
    });
    res.end();
  }

  const filter = { email: email };
  const updateDoc = {
    $set: {
      name: name,
    },
  };
  const result = await Customer.updateOne(filter, updateDoc);
  console.log(result);
  res.status(200).json({
    message: result,
  });
  res.end();
});

module.exports = router;
