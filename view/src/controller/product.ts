import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.withCredentials = true;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`products`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const fetchProduct = async (productId: string) => {
  try {
    const response = await axios.get(`products/${productId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
