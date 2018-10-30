const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config");

const app = express();

mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

const userRoutes = require("./routes/account");
const productRoutes = require("./routes/product");
const sellerRoutes = require("./routes/seller");
const productSearchRoutes = require("./routes/product-search");
const paymentRoutes = require("./routes/payment");


app.use("/api", productRoutes);
app.use("/api/accounts", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/search", productSearchRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(config.port, err => {
  console.log("Server started at port " + config.port);
});
