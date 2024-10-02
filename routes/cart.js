const experss = require("express");
const passport = require("passport");
const CartService = require("../services/CartService");

const CartServiceInstance = new CartService();
const router = experss.Router();

module.exports = (app) => {
  app.use("/api/carts", router);
  router.get("/mine", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await CartServiceInstance.loadCart(id);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });

  router.put("/mine", async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await CartServiceInstance.get({ id });
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });

  router.post("/mine", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await CartServiceInstance.create({ userid: id });
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });

  router.post("/mine/items", async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = req.body;
      const response = await CartServiceInstance.addItem(id, data);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });

  router.put("/mine/items/:cartItemId", async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const data = req.body;
      const response = await CartServiceInstance.updateItem(cartItemId, data);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/mine/items/:cartItemId", async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const response = await CartServiceInstance.removeItem(cartItemId);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });

  router.post("/mine/checkout", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { total } = req.body;
      const response = await CartServiceInstance.checkout(id, total);
      res.status(200).send({ clientSecret: response.client_secret });
    } catch (error) {
      next(error);
    }
  });

  router.get("/mine/config", async (req, res, next) => {
    try {
      const { id } = req.user;
      if (id) {
        const response = await CartServiceInstance.getConfig(id);
        res.status(200).send(response);
      }
    } catch (error) {
      next(error);
    }
  });
};
