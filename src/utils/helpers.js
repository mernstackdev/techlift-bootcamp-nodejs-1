require("dotenv").config();
const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_PRIVATE_KEY;

const generateAuthToken = ({ username, email, id }) =>
  jwt.sign({ username, email, id }, privateKey);

const verifyAuthToken = (token) => jwt.verify(token, privateKey);

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
