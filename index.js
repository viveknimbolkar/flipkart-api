const dotenv = require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./src/routes/auth");
const customerRoutes = require("./src/routes/customer");
const cartRoutes = require("./src/routes/cart");
const reviewRoutes = require("./src/routes/reviews");
const db = require("./src/database/database");

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(authRoutes);
app.use(customerRoutes);
app.use(cartRoutes);
app.use(reviewRoutes);

app.listen(process.env.PORT, () => {
  console.log("listening on port: ", process.env.PORT);
});
