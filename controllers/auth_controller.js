const { V_user } = require("../model/user");
const flashMessage = require("connect-flash");

const renderRegisterUser = (req, res) => {
  return res.render("../view/register.ejs");
};

const registerUser = (req, res) => {
  try {
    const body = req.body;
    console.log(body);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, renderRegisterUser };
