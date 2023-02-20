const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { Cart } = require("../model/cart");
const { Customer } = require("../model/user");
const { verifyUser } = require("../middleware/verifyUser");

/**
 * @swagger
 * /get_cart_items:
 *   post:
 *     description: Fetch the cart item of specific user
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Cart is empty
 *       500:
 *         description: Error
 */
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
      res.status(500).json({ msg: "something went wrong. please try again" });
    });
});

/**
 * @swagger
 * /remove_cart_item:
 *   post:
 *     description: Remove cart items of specific user
 *     parameters:
 *       - in: query
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: product_name
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
router.post("/remove_cart_item", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const { product_id, product_name } = req.body;

  if (!product_name || !product_id) {
    res.status(400).json({ message: "empty fields are not allowed" });
  }

  Cart.findByIdAndDelete(product_id, async (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted from cart collection");
      // remove from user collection as well
      const filter = { email: token.email };
      const updateCart = {
        $pull: {
          cart: {
            $in: [product_id],
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
          .status(500)
          .json({ message: "something went wrong! try again later" });
      }
    }
  });
});

/**
 * @swagger
 * /add_to_cart:
 *   post:
 *     description: Add cart items of specific user
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: image
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: in_stock
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: discount
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: original_price
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: flipkart_assured
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: seller_name
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */

router.post("/add_to_cart", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const {
    name,
    price,
    image,
    in_stock,
    discount,
    original_price,
    flipkart_assured,
    seller_name,
  } = req.body;

  if (
    !name ||
    !price ||
    !image ||
    !in_stock ||
    !discount ||
    !original_price ||
    !flipkart_assured ||
    !seller_name
  ) {
    res.status(200).json({ message: "empty fields are not allowed" });
  }

  const cartItem = {
    name: name,
    price: price,
    image: image,
    inStock: in_stock,
    discount: discount,
    originalPrice: original_price,
    flipkartAssured: flipkart_assured,
    sellerName: seller_name,
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
        .status(500)
        .json({ message: "something went wrong! try again later" });
    }
  } else {
    res.status(500).json({ message: "something went wrong! try again later" });
  }
});
module.exports = router;
