const express = require("express");
const route = express();
const {
  PopularinWoman,
  Newcollection,
  Allproducts,
  Removeproduct,
  Addproducts,
} = require("../controller/product.controller.js");

route.post("/addproduct", Addproducts);
route.post("/removeproduct", Removeproduct);
route.get("/allproducts", Allproducts);
route.get("/newcollections", Newcollection);
route.get("/popularinwomen", PopularinWoman);

module.exports = route;
