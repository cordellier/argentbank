import axios from "axios";

const API_URL = "http://localhost:3001/api/v2";

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

export const updateUserProfile = async (token, userName) => {
  const response = await api.put(
    "/user/profile",
    { userName },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export default api;
