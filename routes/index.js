const passport = require("../loaders/passport");
const authLoader = require("./auth");

module.exports = (app, passport) => {
  authLoader(app, passport);
};
