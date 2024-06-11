const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./database/dbconnect.js");
const AuthRoute = require("./routes/user.route.js");
const ProductRoute = require("./routes/product.route.js");
const CartRoute = require("./routes/cart.route.js");
const PaymentRouter = require("./routes/payment.route.js")
const port = 4000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.use("/api/v1", AuthRoute);
app.use("/api/v1", ProductRoute);
app.use("/api/v1", CartRoute);
app.use("/api/v1", PaymentRouter);

app.get("/api/v1/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY_ID })
);

//https://urban-nest-backend-v1.onrender.com
app.listen(port, (error) => {
  if (!error) {
    console.log(`http://localhost:${port}/api/v1`);
    dbconnect();
  } else {
    console.log("Error: " + error);
  }
});

