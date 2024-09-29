// authActions.js
import api from "../../services/api";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await api.post("/user/login", { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.body.token });
    return response.data.body.token;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
    throw error;
  }
};

export const logout = () => ({ type: LOGOUT });
