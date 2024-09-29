import axios from "axios";
import { API_URL } from "./config/apiUrl";

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (email, password) => {
  const response = await api.post("/user/login", { email, password });
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await api.post(
    "/user/profile",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateUserProfile = async (token, userData) => {
  const response = await api.put("/user/profile", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default api;
