const express = require("express");
const router = express.Router();

const OrderService = require("../services/");

const OrderServiceInstance = new OrderService();

module.exports = (app) => {
  app.use("/orders", router);
  router.get("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await OrderServiceInstance.list(id);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:ordrerId", async (req, res, next) => {
    try {
      const { id } = req.res;

      const response = await OrderServiceInstance.list(id);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });
};
