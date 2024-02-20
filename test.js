require("dotenv").config();
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { _id: "1cae36a1-0777-4aa3-a9b5-2c30d43bd6ad" },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);
console.log(token);