import axios from "axios";
import { profileSchema } from "../validations/profile";
import { z } from "zod";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;
type profileData = z.infer<typeof profileSchema>;

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

export const update = async (updatedFields: Partial<profileData>) => {
  try {
    const response = await axios.put("/users", updatedFields);
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
