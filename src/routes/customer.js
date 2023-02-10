const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { Cart } = require("../model/cart");
const { Customer } = require("../model/user");

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

router.post("/add_address", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const {
    name,
    mobile,
    alternateMobile,
    pincode,
    address,
    locality,
    addressType,
    city,
    state,
    landmark,
  } = req.body;
  if (
    !name ||
    !mobile ||
    !alternateMobile ||
    !pincode ||
    !address ||
    !locality ||
    !addressType ||
    !city ||
    !state ||
    !landmark
  ) {
    res.status(400).json({ message: "empty fields are not allowed" });
  }
  const newAddress = {
    name: name,
    mobile: mobile,
    alternateMobile: alternateMobile,
    pincode: pincode,
    address: address,
    locality: locality,
    addressType: addressType,
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
    res.status(200).json({ message: "something went wrong! try again later" });
  }
});

router.post("/get_cart_items", verifyUser, async (req, res) => {});

router.post("/remove_cart_item", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const {
    id, // product id
    name, // product name
  } = req.body;

  if (!name || !id) {
    res.status(400).json({ message: "empty fields are not allowed" });
  }

  Cart.findByIdAndDelete(id, async (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted from cart collection");
      // remove from user collection as well
      const filter = { email: token.email };
      const updateCart = {
        $pull: {
          cart: {
            $in: [id],
          },
        },
      };
      const removeCartID = await Customer.updateOne(filter, updateCart);
      if (removeCartID) {
        res.status(200).json({
          message: "cart item removed successfuly",
        });
      } else {
        res
          .status(200)
          .json({ message: "something went wrong! try again later" });
      }
    }
  });
});

router.post("/add_to_cart", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const {
    name,
    price,
    image,
    inStock,
    discount,
    originalPrice,
    flipkartAssured,
    sellerName,
  } = req.body;

  if (
    !name ||
    !price ||
    !image ||
    !inStock ||
    !discount ||
    !originalPrice ||
    !flipkartAssured ||
    !sellerName
  ) {
    res.status(400).json({ message: "empty fields are not allowed" });
  }

  const cartItem = {
    name: name,
    price: price,
    image: image,
    inStock: inStock,
    discount: discount,
    originalPrice: originalPrice,
    flipkartAssured: flipkartAssured,
    sellerName: sellerName,
    one: "sld",
  };
  // add to cart table
  const cart = new Cart(cartItem);
  const result = await cart.save();
  console.log(result);
  if (result) {
    // add cart item in respective user account
    const filter = { email: token.email };
    const updateCart = {
      $push: {
        cart: result._id,
      },
    };
    const addCartItemToUser = await Customer.updateOne(filter, updateCart);
    if (addCartItemToUser) {
      res.status(200).json({ message: "cart item added" });
    } else {
      res
        .status(200)
        .json({ message: "something went wrong! try again later" });
    }
  } else {
    res.status(200).json({ message: "something went wrong! try again later" });
  }
});

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
    message: "gender updated successfully",
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
