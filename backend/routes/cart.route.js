const express = require("express");
const authenticate = require("../middleware/auth.middleware.js");
const {
  Addtocart,
  Removefromcart,
  Getcart,
} = require("../controller/cart.controller.js");
const route = express();

route.post("/getcart", authenticate, Getcart);
route.post("/removefromcart", authenticate, Removefromcart);
route.post("/addtocart", authenticate, Addtocart);

module.exports = route;
