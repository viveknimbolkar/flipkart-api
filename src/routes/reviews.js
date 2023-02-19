const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { Cart } = require("../model/cart");
const { Customer } = require("../model/user");
const { verifyUser } = require("../middleware/verifyUser");
const { Reviews } = require("../model/reviews");

router.post("/add_review", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const {
    title,
    rating,
    shortReview,
    longReview,
    customerName,
    dateOfReview,
    productImage,
  } = req.body;

  if (
    !title ||
    !rating ||
    !shortReview ||
    !customerName ||
    !dateOfReview ||
    !longReview ||
    !productImage
  ) {
    res.status(404).json({ msg: "empty fields are not allowed" });
  }

  const reviewData = {
    title: title,
    rating: rating,
    shortReview: shortReview,
    longReview: longReview,
    customerName: customerName,
    dateOfReview: dateOfReview,
    productImage: productImage,
  };

  const reviewInstance = new Reviews(reviewData);
  const result = await reviewInstance.save();
  if (result) {
    // add cart item in respective user account
    const filter = { email: token.email };
    const updateCart = {
      $push: {
        review: result._id,
      },
    };
    const addReviewInUser = await Customer.updateOne(filter, updateCart);
    if (addReviewInUser) {
      res.status(200).json({ message: "review added successfully" });
    } else {
      res
        .status(400)
        .json({ message: "something went wrong! try again later" });
    }
  } else {
    res.status(200).json({ message: "something went wrong! try again later" });
  }
 
});

router.get("/get_reviews", verifyUser, async (req, res) => {
    const email = jwt.decode(
      req.headers.authorization,
      process.env.JWT_SECRET
    ).email;
  
    Customer.findOne({ email: email })
      .exec()
      .then((data) => {
        if (data) {
          const reviewItemsId = data.reviews;
          Reviews.find(
            {
              _id: {
                $in: reviewItemsId,
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
          res.status(404).json({ msg: "no reviews found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ msg: "something went wrong. please try again" });
      });
  });
  
  router.post("/remove_review", verifyUser, async (req, res) => {
    const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
    const {
      id, // product id
      name, // product name
    } = req.body;
  
    if (!name || !id) {
      res.status(400).json({ message: "empty fields are not allowed" });
    }
  
    Reviews.findByIdAndDelete(id, async (err, result) => {
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

module.exports = router;
