// creating the router

var bodyParser = require("body-parser");
const express = require("express");
const routAuth = express.Router();
const register = require(__dirname + "/../controllers/auth_controller");
//const {V_user} = require("../model/user");
routAuth.use(express.json(() => {}));
routAuth.use(bodyParser.json());
routAuth.use(bodyParser.urlencoded({ extended: true }));
const flash = require("connect-flash");
routAuth.use(flash());

// routAuth.use("/register", (req, res, next) => {
//   res.locals.successMessage = req.flash("success");
//   res.locals.errorMessage = req.flash("error");
//   next();
// });

// newpost
routAuth.get("/register", register.renderRegisterUser);

routAuth.post("/register", register.registerUser);

// exporting routed post
module.exports = { routAuth };
