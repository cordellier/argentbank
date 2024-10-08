import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

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

export const updateUserProfile = async (token, firstName, lastName) => {
  const response = await api.put(
    "/user/profile",
    { firstName, lastName },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export default api;
