const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { Customer } = require("../model/user");


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
    message: 'gender updated successfully',
  });
  res.end();
});

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
