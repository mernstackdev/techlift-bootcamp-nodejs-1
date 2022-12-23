const { verifyAuthToken } = require("../utils/helpers");

const authHandler = (req, res, next) => {
  if (!req.headers.api) {
    return res
      .status(400)
      .send({ message: "Access denied, Auth token is not provided" });
  }

  try {
    const token = req.headers.api;
    const isTokenValid = verifyAuthToken(token);
    if (isTokenValid) {
      next();
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
    next();
  }

  // if (
  //   req.headers.api !== undefined
  // ) {
  //   next();
  // } else {
  //   return res.status(404).send({ message: "API key is not valid!" });
  // }
};
// 2864de72-1451-44f8-8882-38e6d3c3fd0f
module.exports = authHandler;
