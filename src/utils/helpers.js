require("dotenv").config();
const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_PRIVATE_KEY;

const generateAuthToken = ({ name, email, id }) =>
  jwt.sign({ name, email, id }, privateKey);

const verifyAuthToken = (token) => jwt.verify(token, privateKey);

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
