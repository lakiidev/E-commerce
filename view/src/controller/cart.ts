import axios from "axios";
import { Product } from "../types";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

export const fetchCart = async () => {
  try {
    const response = await axios.get(`carts/mine`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const addToCart = async (product: Product, qty: number) => {
  try {
    const response = await axios.post(`carts/mine/items`, { product, qty });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateCart = async (cartItemId: number, qty: number) => {
  try {
    const response = await axios.put(`carts/mine/items/${cartItemId}`, {
      quantity: qty,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const removeFromCart = async (cartItemId: number) => {
  try {
    const response = await axios.delete(`carts/mine/items/${cartItemId}`);

    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const checkout = async (cartId: string, paymentInfo: string) => {
  try {
    const response = await axios.post(`carts/mine/checkout`, {
      cartId,
      paymentInfo,
    });

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
