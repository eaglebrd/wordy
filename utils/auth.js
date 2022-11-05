const becrypt = require("bcrypt");
const hashd_pass_gen = (password) => {
  return becrypt.hashSync(password, 10);
};
module.exports = { hashd_pass_gen };
