const becrypt = require("bcrypt");
const hashd_pass_gen = (password) => {
  return becrypt.hashSync(password, 10);
};

const validatePassword = (password, hash) => {
  return becrypt.compareSync(password, hash);
};
module.exports = { hashd_pass_gen, validatePassword };
