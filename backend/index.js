const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./database/dbconnect.js");
const AuthRoute = require("./routes/user.route.js");
const ProductRoute = require("./routes/product.route.js");
const CartRoute = require("./routes/cart.route.js");
const port = 4000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.use("/api/v1", AuthRoute);
app.use("/api/v1", ProductRoute);
app.use("/api/v1", CartRoute);

app.listen(port, (error) => {
  if (!error) {
    console.log(`http://localhost:${port}/api/v1`);
    dbconnect();
  } else {
    console.log("Error: " + error);
  }
});

