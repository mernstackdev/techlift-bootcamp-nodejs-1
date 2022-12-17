const express = require("express");
const User = require("../../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.get("/:userId", async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });

  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const payload = req.body;
  let user = new User(payload);

  user = await user.save();
  res.status(200).send({ user });
});

module.exports = router;
