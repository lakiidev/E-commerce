const passport = require("../loaders/passport");
const authLoader = require("./auth");
const userLoader = require("./user");
const cartLoader = require("./cart");
const products = require("./products");
const orders = require("./orders");
module.exports = (app, passport) => {
  userLoader(app);
  authLoader(app, passport);
  cartLoader(app);
  products(app);
  orders(app);
};
