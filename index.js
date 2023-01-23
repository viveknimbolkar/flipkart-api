const dotenv = require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const userRoute = require("./src/routes/user");
const db = require("./src/database/database");

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(userRoute);

app.listen(process.env.PORT, () => {
  console.log("listening on port: ", process.env.PORT);
});
