const express = require("express");
const errorHandler = require("../../middleware/error");
const User = require("../../models/user");
const { generateAuthToken } = require("../../utils/helpers");
const { FormateUserObj } = require("./UserFormatter");
const createUserSchema = require("./validationSchema");
const jwt = require("jsonwebtoken");
const authHandler = require("../../middleware/auth");
const router = express.Router();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dbfwvp72n",
  api_key: "521163633118111",
  api_secret: "J-pKLCUytlP_Qfq2r6rhmWb5w9c",
});
router.get(
  "/",
  authHandler,
  errorHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
  })
);

router.get(
  "/logout",
  authHandler,
  errorHandler(async (req, res) => {
    const user = await User.findOne({ token: req.headers.token });
    await User.findOneAndUpdate({ _id: user._id }, { token: "" });
    res.status(200).send({
      status: true,
      message: "Logout successfully",
    });
  })
);

router.get(
  "/:userId",
  authHandler,
  errorHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    const UserObj = FormateUserObj(user);
    res.status(200).send({
      status: true,
      message: "user found successfully",
      data: UserObj,
    });
  })
);

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ message: "Invalid Email" });
  }

  if (req.body.password !== user.password) {
    return res.status(400).send({ message: "Invalid Password" });
  }

  const token = generateAuthToken({
    name: user.name,
    email: user.email,
    id: user._id,
  });

  user.token = token;

  await User.findOneAndUpdate({ _id: user._id }, { token: token });

  const UserObj = FormateUserObj(user);
  res.status(200).send({
    status: true,
    message: "Login successfully",
    token,
    data: UserObj,
  });
});

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const { error } = createUserSchema(payload);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error.details[0].message });
  }
  const checkUserEmail = await User.findOne({ email: req.body.email });
  if (checkUserEmail) {
    return res
      .status(400)
      .send({ status: false, message: "email already exist" });
  }

  const checkUserPhone = await User.findOne({ phone: req.body.phone });
  if (checkUserPhone) {
    return res
      .status(400)
      .send({ status: false, message: "Phone already exist" });
  }

  try {
    await cloudinary.uploader.upload(
      req.body.image,
      { public_id: "olympic_flag" },
      async (error, result) => {
        if (error) {
          res.status(400).send({ status: false, message: error.message });
        } else {
          payload.image = result.secure_url;
          // await User.findOneAndUpdate({ _id: user._id }, { image: result.secure_url });
          // console.log(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  let user = new User(payload);
  user = await user.save();

  const UserObj = FormateUserObj(user);
  res
    .status(200)
    .send({ status: true, message: "Signup successfully!", data: UserObj });
});

module.exports = router;
