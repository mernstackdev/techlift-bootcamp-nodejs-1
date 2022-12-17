const authHandler = (req, res, next) => {
  //  const API=2864de72-1451-44f8-8882-38e6d3c3fd0f;
  if (
    req.headers.api !== undefined &&
    req.headers.api == "2864de72-1451-44f8-8882-38e6d3c3fd0f"
  ) {
    next();
  } else {
    return res.status(404).send({ message: "API key is not valid!" });
  }
};
// 2864de72-1451-44f8-8882-38e6d3c3fd0f
module.exports = authHandler;
