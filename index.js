require("dotenv").config();

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const port = process.env.PORT;
const dataBaseUrl = process.env.MONGO_URL;

const httpStatusText = require("./utils/httpStatusText");

mongoose.connect(dataBaseUrl).then(() => {
  console.log("Connected Database");
});

app.use(express.json());

const adminRouter = require("./routers/adminRouters");
const orthopedicRouter = require("./routers/orthopedicRouters");
const eyeRouter = require("./routers/eyeRouters");

app.use("/api/admin", adminRouter);
app.use("/api/orthopedic", orthopedicRouter);
app.use("/api/eye", eyeRouter);

// global middleware for not found router
app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({
      status: httpStatusText.ERROR,
      message: "this resource is not available",
    });
});

// global error handler
app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({
      status: error.statusText || httpStatusText.ERROR,
      message: error.message,
      data: null,
    });
});

app.listen(port, () => {
  console.log(`App listen in port ${port}`);
});
