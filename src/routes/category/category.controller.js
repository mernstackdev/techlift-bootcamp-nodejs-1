const express = require("express");
const errorHandler = require("../../middleware/error");
const Category = require("../../models/category");
const { FormateCategoryObj } = require("./CategoryFormatter");
const createCategorySchema = require("./validationSchema");
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
    const categories = await Category.find();
    res.status(200).send({
      status: true,
      message: "Categories found successfully",
      data: categories,
    });
  })
);

router.get(
  "/:categoryId",
  authHandler,
  errorHandler(async (req, res) => {
    const category = await Category.findOne({ _id: req.params.categoryId });
    const CategoryObj = FormateCategoryObj(category);
    res.status(200).send({
      status: true,
      message: "Category found successfully",
      data: CategoryObj,
    });
  })
);

router.patch(
  "/:categoryId",
  authHandler,
  errorHandler(async (req, res) => {
    const payload = req.body;
    const { error } = createCategorySchema(payload);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error.details[0].message });
    }
    const checkCategoryName = await Category.findOne({ name: req.body.name });
    if (checkCategoryName) {
      return res
        .status(400)
        .send({ status: false, message: "This category name already exist" });
    }
    if (!req.body.image.includes("http")) {
      try {
        await cloudinary.uploader.upload(
          req.body.image,
          { public_id: "category_images" },
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
    }
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.categoryId },
      payload
    );
    const CategoryObj = FormateCategoryObj(category);
    res.status(200).send({
      status: true,
      message: "Category updated successfully",
      data: CategoryObj,
    });
  })
);

router.delete(
  "/:categoryId",
  authHandler,
  errorHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete({ _id: req.params.categoryId });
    console.log(category);

    res.status(200).send({
      status: true,
      message: "Category deleted successfully",
    });
  })
);

router.post("/", async (req, res) => {
  const payload = req.body;
  const { error } = createCategorySchema(payload);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error.details[0].message });
  }
  const checkCategoryName = await Category.findOne({ name: req.body.name });
  if (checkCategoryName) {
    return res
      .status(400)
      .send({ status: false, message: "This category name already exist" });
  }

  try {
    await cloudinary.uploader.upload(
      req.body.image,
      { public_id: "category_images" },
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
  let category = new Category(payload);
  category = await category.save();

  const CategoryObj = FormateCategoryObj(category);
  res.status(200).send({
    status: true,
    message: "Category created successfully!",
    data: CategoryObj,
  });
});

module.exports = router;
