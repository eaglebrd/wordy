const session = require("express-session");
const MongoStore = require("connect-mongo");

const newSession = session({
  secret: "supersecret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 1 * 24 * 60 * 60 * 1000 },
  store: MongoStore.create({ mongoUrl: process.env.dB_URI }),
});
module.exports = { newSession };
