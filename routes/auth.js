const express = require("express");
const router = express.Router();

const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();

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
    passport.authenticate("local"),
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
};
