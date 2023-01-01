const User = require("../models/user");
const { verifyAuthToken } = require("../utils/helpers");

const authHandler = async(req, res, next) => {
  if (!req.headers.token) {
    return res
      .status(400)
      .send({ message: "Access denied, Auth token is not provided" });
  }

  try {
    const token = req.headers.token;
    const isTokenValid = verifyAuthToken(token);
    if (isTokenValid) {
      const user = await User.findOne({ token: token });
      if (user) {
        next();
      }else{
        return res.status(400).send({ message: "Access denied, Expired token" });
      
      }
    }
  } catch (error) {
    return res.status(400).send({ message: "Access denied, Unauthorized token" });
  }
};

module.exports = authHandler;
