const express = require("express");
const router = express.Router();

const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {
  app.use("/auth", router);

  router.post("/register", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });
  router.login(
    "/login",
    passport.assport.authenticate("local"),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;
        const response = await AuthServiceInstance({
          email: username,
          password,
        });
        res.status.send();
      } catch (error) {
        next(error);
      }
    }
  );
};
