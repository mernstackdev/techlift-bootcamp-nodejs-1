const express = require("express");
const errorHandler = require("../../middleware/error");
const User = require("../../models/user");
const createUserSchema = require("./validationSchema");

const router = express.Router();

router.get(
  "/",
  errorHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
  })
);

router.get(
  "/:userId",
  errorHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });

    res.status(200).send(user);
  })
);

router.post("/", async (req, res) => {
  const payload = req.body;
  const { error } = createUserSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let user = new User(payload);

  user = await user.save();
  res.status(200).send({ user });
});

module.exports = router;
