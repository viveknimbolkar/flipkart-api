const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { Cart } = require("../model/cart");
const { Customer } = require("../model/user");
const { verifyUser } = require("../middleware/verifyUser");

router.get("/get_cart_items", verifyUser, async (req, res) => {
  const email = jwt.decode(
    req.headers.authorization,
    process.env.JWT_SECRET
  ).email;

  Customer.findOne({ email: email })
    .exec()
    .then((data) => {
      if (data) {
        console.log(data.cart);
        const cartItemsId = data.cart;
        Cart.find(
          {
            _id: {
              $in: cartItemsId,
            },
          },
          (err, result) => {
            if (err) {
              res
                .status(400)
                .json({ msg: "something went wrong. please try again later" });
            }
            res.status(200).json({ msg: result });
          }
        );
      } else {
        res.status(404).json({ msg: "cart is empty" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ msg: "something went wrong. please try again" });
    });
});

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
module.exports = router;
