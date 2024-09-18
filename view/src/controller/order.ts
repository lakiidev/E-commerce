import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`orders`);

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const fetchOrder = async (orderId: string) => {
  try {
    const response = await axios.get(`orders/${orderId}`);

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
