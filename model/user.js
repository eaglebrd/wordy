// To create a schema for user info.

const { Schema, default: mongoose } = require("mongoose");
const userInfo = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    about: String,
  },
  {
    timestamp: true,
  }
);
const V_user = mongoose.model("V_user", userInfo);

module.exports = { V_user };
