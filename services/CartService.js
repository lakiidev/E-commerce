const createError = require("http-errors");
const CartModel = require("../models/cart");
const OrderModel = require("../models/order");
const CartItemModel = require("../models/cartItem");

const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
module.exports = class CartService {
  async create(data) {
    const { userId } = data;
    try {
      const Cart = new CartModel();
      const cart = await Cart.create(userId);
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async loadCart(userId) {
    try {
      const cart = await CartModel.findOneByUser(userId);
      if (cart) {
        const items = await CartItemModel.find(cart.id);
        cart.items = items;
      }

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async addItem(userId, item) {
    try {
      const cart = await CartModel.findOneByUser(userId);
      const existingItems = await CartItemModel.find(cart.id);
      const existingItem = existingItems.find(
        (cartItem) => cartItem.id === item.productId
      );
      if (existingItem) {
        const updatedQty = existingItem.quantity + item.qty;
        const updatedItem = await CartItemModel.update(
          existingItem.cartitemid,
          {
            quantity: updatedQty,
          }
        );
        return updatedItem;
      } else {
        const newItem = await CartItemModel.create({
          cartId: cart.id,
          ...item,
        });
        return newItem;
      }
    } catch (err) {
      throw err;
    }
  }

  async removeItem(cartItemId) {
    try {
      const cartItem = await CartItemModel.delete(cartItemId);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async updateItem(cartItemId, data) {
    try {
      const cartItem = await CartItemModel.update(cartItemId, data);
      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async checkout(total) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }
  async getConfig() {
    try {
      return {
        publishableKey: STRIPE_PUBLISHABLE_KEY,
      };
    } catch (error) {
      throw error;
    }
  }
};
