const express = require("express");
const { Signup, Login } = require("../controller/user.controller.js");
const route = express();

route.post("/signup", Signup);
route.post("/login", Login);

module.exports = route;
