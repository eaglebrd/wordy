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
const { V_user } = require("../model/user");
const pass_help = require("../utils/auth");
routAuth.use(flash());

routAuth.use((req, res, next) => {
  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  successMessage = "klin";
  next();
});

// newpost
routAuth.get("/register", register.renderRegisterUser);

routAuth.post("/register", register.registerUser);

routAuth.get("/login", (req, res) => {
  res.render("./../view/login.ejs", {
    successMessage: req.flash(successMessage),
  });
});

routAuth.post("/login", async (req, res) => {
  try {
    const body = req.body;
    if (!body.email || !body.password) {
      req.flash("error", "please provide all info");
      return res.status(400).redirect("/login");
    }
    const useer = await V_user.findOne({ email: body.email.toLowerCase() });

    if (!useer) {
      req.flash("error", "invalid email or password");
      return res.status(400).redirect("/login");
    }
    const passvalid = pass_help.validatePassword(body.password, useer.password);
    if (!passvalid) {
      req.flash("error", "invalid password");
    }
    req.session.user = useer;
    req.flash("successMessage", "login successful");
    console.log(res.locals);
    res.status(200).redirect(`/dashboard/${user._id}`);
  } catch (error) {
    req.flash("error", "somerhing happened!");
    return res.status(500).redirect("/login");
  }
});

routAuth.get("/dashboard/:userid", register.dashboard);

// exporting routed post
module.exports = { routAuth };
