const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");

const UserServiceInstance = new UserService();

module.exports = (app) => {
  app.use("/users", router);

  router.get("/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;
      const response = await UserServiceInstance.get({ id: userId });
      res.status(200).response(response);
    } catch (error) {
      next(error);
    }
  });

  router.put("/:roterId", async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = req.body;
      const resposne = await UserServiceInstance.update({
        id: userId,
        ...data,
      });
      res.status(200).response(resposne);
    } catch (error) {
      next(error);
    }
  });
};
