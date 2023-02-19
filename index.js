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
const swaggerUi = require("swagger-ui-express");
const { swaggerDocs } = require("./src/lib/swagger");
console.log(swaggerDocs);
// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(authRoutes);
app.use(customerRoutes);
app.use(cartRoutes);
app.use(reviewRoutes);

// api docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(process.env.PORT, () => {
  console.log("listening on port: ", process.env.PORT);
});
