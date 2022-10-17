const session = require("express-session");
const MongoStore = require("connect-mongo");

const newSession = session({
  secret: "Keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: MongoStore.create({ mongoUrl: process.env.dB_URI }),
});
module.exports = { newSession };
