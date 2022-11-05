const { V_user } = require("../model/user");

const { hashd_pass_gen } = require("../utils/auth.js");

const flash = require("connect-flash");

const renderRegisterUser = (req, res) => {
  const successMessage = req.flash("success");
  const errorMessage = req.flash("error");
  return res.render("../view/register.ejs", { successMessage, errorMessage });
};

const registerUser = async (req, res) => {
  try {
    console.log(req.method, req.path, req.hostname);
    const body = req.body;

    if (!body.firstName || !body.lastName || !body.password || !body.email) {
      req.flash("error", "Please, input all fields");
      // res.return flash("Incosistent")
      return res.status(400).redirect("/register");
    }
    body.password = hashd_pass_gen(body.password);
    body.email = body.email.toLowerCase();

    const isEgzistingmail = await V_user.findOne({ email: body.email });

    if (isEgzistingmail) {
      // send error message
      req.flash("error", "email used by someone else");
      return res.status(400).redirect("/register");
    }

    await new V_user(body).save();
    req.flash("success", "Register successful, please sign in");
    console.log(res.locals.successMessage, "done");
    return res.status(201).redirect("/login");
  } catch (error) {
    console.log(error);
    req.flash("error", "Error! something went wrong");
    res.status(500).redirect("/register");
  }
  console.log(res.locals.successMessage);
};
module.exports = { registerUser, renderRegisterUser };
