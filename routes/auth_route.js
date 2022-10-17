// creating the router
const express = require("express");
const routAuth = express.Router();
const { registerUser } = require(__dirname + "/../controllers/auth_controller");

// newpost
routAuth.get("/register", registerUser);

// exporting routed post
module.exports = { routAuth };
