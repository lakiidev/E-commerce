const express = require("express");
const router = express.Router();

const OrderService = require("../services/OrderService");
const OrderServiceInstance = new OrderService();
const CartService = require("../services/CartService");
const CartServiceInstance = new CartService();

module.exports = (app) => {
  app.use("/api/orders", router);
  router.get("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await OrderServiceInstance.list(id);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });
  router.post("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { paymentIntentId } = req.body;
      const orderInfo = await OrderServiceInstance.create(paymentIntentId, id);
      const orderItems = await OrderServiceInstance.addItems(orderInfo.id);
      const orders = { ...orderInfo, items: orderItems };
      res.status(200).send(orders);
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
