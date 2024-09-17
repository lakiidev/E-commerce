const express = require("express");
const router = express.Router();

const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();

const CartService = require("../services/CartService");
const CartServiceInstance = new CartService();

const UserService = require("../services/UserService");
const UserServiceInstance = new UserService();

module.exports = (app, passport) => {
  app.use("/api/auth", router);

  router.post("/register", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });
  router.post(
    "/login",
    passport.authenticate("local", { session: true, sucessRedirect: "/" }),
    async (req, res, next) => {
      try {
        const { email, password } = req.body;

        const response = await AuthServiceInstance.login({
          email,
          password,
        });

        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    }
  );
  router.get("/checkUserStatus", async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await UserServiceInstance.get({ id });
      const cart = await CartServiceInstance.loadCart(id);
      if (!cart) {
        await CartServiceInstance.create({ userId: id });
        const cart = await CartServiceInstance.loadCart(id);
      }

      res.status(200).send({
        cart,
        loggedIn: true,
        user,
      });
    } catch (err) {
      next(err);
    }
  });
};
