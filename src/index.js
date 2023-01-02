const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user/user.controller");
const categoryRoutes = require("./routes/category/category.controller");
const port = 4000;
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/MarksKitchen")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB, ${error}`));

app.use("/users", userRouter);
app.use("/category", categoryRoutes);

app.listen(port, () => console.log("App is listening at port "+ port));
