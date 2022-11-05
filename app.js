const { urlencoded, json } = require("express");
const express = require("express");
const { routApp } = require("./routes/post_routes.js");
const dB = require("mongoose");
const dotenV = require("dotenv").config();
PORT = process.env.PORT || 5000;
const { newSession } = require("./midwares/session");
const app = express();
const { routAuth } = require("./routes/auth_route.js");
const flash = require("connect-flash");

// Import Schema
const { Post } = require("./model/post");
const { V_user } = require("./model/user.js");

//Initiating View engine "ejs"
app.set("view engine", "ejs");

// Setting up middleware
app.use(newSession);
app.use(routAuth);
app.use(routApp);
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(express.json());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  next();
});

const dBURI = process.env.dB_URI;
// Like
dB.connect(dBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .then((val) => {
    console.log(PORT, 100);
    //console.log(val);
  })
  .catch((error) => console.log(error));

// Home page visit
app.get("/", (req, res) => {
  console.log("error");
  Post.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render(__dirname + "/view/home.ejs", { hom: homE, post_s: result });
    })
    .catch((error) => {
      console.log(error);
    });
  const homE =
    "Pour in your engineering related articles, we will check your work for engineering consistency, if within compliance  with bscode or other well recognised engineering codes it gets a credit for stay";
});

app.get("/about", (req, res) => {
  res.render(__dirname + "/view/about.ejs");
});
