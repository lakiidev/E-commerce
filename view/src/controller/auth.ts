import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/auth/register", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await axios.get("/auth/checkUserStatus");
    return response.data;
  } catch (error) {
    throw error;
  }
};
