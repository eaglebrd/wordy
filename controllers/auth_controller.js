const { V_user } = require("../model/user");

const { hashd_pass_gen } = require("../utils/auth.js");

const flash = require("connect-flash");

const renderRegisterUser = (req, res) => {
  // const successMessage = req.flash();
  // const errorMessage = req.flash("error");
  // res.locals.successMessage = "please register now";
  // res.locals.errorMessage = "Something went wrong";
  // req.flash("error", req.body.errorMessage);
  return res.render("../view/register.ejs");
};
const registerUser = async (req, res) => {
  try {
    const body = req.body;
    if (!body.firstName || !body.lastName || !body.password || !body.email) {
      req.flash("error", "Inconsistent field");

      res.return(flash("error", "Inconsistent field"));
      return res.status(400).redirect("/register");
    }
    body.password = hashd_pass_gen(body.password);
    body.email = body.email.toLowerCase();

    const isEgzistingmail = await V_user.findOne({ email: body.email });

    if (isEgzistingmail) {
      // send error message
      req.flash("error", "email in existence, pls sign in");
      return res.status(400).redirect("/register");
    }

    await new V_user(body).save();
    req.flash("success", "advantage");
    console.log("(", req.body, res.locals, ")");
    return res.status(201).redirect("/login");
  } catch (error) {
    console.log(error);
    req.flash("error", "Error! something went wrong");
    res.status(500).redirect("/register");
  }
  console.log(res.locals.successMessage);
};
const dashboard = (req, res) => {};
module.exports = { registerUser, renderRegisterUser, dashboard };
