const { STRIPE_SECRET_KEY } = require("../config");

const stripe = require("stripe")(STRIPE_SECRET_KEY);
const OrderModel = require("../models/order");
const OrderItem = require("../models/orderItem");
const CartService = require("./CartService");
const CartServiceInstance = new CartService();

module.exports = class OrderService {
  async create(paymentIntentId, userId) {
    try {
      const paymentInetent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      const total = paymentInetent.amount / 100;
      const Order = new OrderModel();
      const order = await Order.create({ total, userid: userId });
      return order;
    } catch (error) {
      throw error;
    }
  }

  async addItems(orderId) {
    try {
      const Order = await OrderModel.findById(orderId);
      const cart = await CartServiceInstance.loadCart(Order.userid);
      const items = cart.items;
      if (!Order) {
        throw new Error("Order not found");
      }
      const OrderItemModel = new OrderItem();

      const orderItems = await Promise.all(
        items.map(async (item) => {
          const orderItem = await OrderItemModel.create({
            orderid: orderId,
            productid: item.id,
            quantity: item.quantity,
            createdat: new Date(),
            modifiedat: new Date(),
          });
          return orderItem;
        })
      );
      await Promise.all(
        items.map(async (item) => {
          await CartServiceInstance.removeItem(item.cartitemid);
        })
      );

      return orderItems;
    } catch (error) {
      throw error;
    }
  }

  async list(userId) {
    try {
      const orders = await OrderModel.findByUser(userId);
      return orders;
    } catch (err) {
      throw err;
    }
  }

  async findById(orderId) {
    try {
      const order = await OrderModel.findById(orderId);
      return order;
    } catch (err) {
      throw err;
    }
  }
};
