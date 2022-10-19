// creating the router
var bodyParser = require("body-parser");
const express = require("express");
const routAuth = express.Router();
const register = require(__dirname + "/../controllers/auth_controller");

// newpost
routAuth.get("/register", register.renderRegisterUser);

routAuth.post("/register", register.registerUser);

// exporting routed post
module.exports = { routAuth };
