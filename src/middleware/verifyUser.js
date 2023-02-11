
const jwt = require("jsonwebtoken");

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

module.exports = { verifyUser };
