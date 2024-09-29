// userActions.js

import api from "../../services/api";
import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from "../types";

export const fetchUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_PROFILE_START });
  try {
    const {
      auth: { token },
    } = getState();
    const response = await api.post(
      "/user/profile",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data.body });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch profile",
    });
  }
};

export const updateUser = (userData) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PROFILE_START });
  try {
    const {
      auth: { token },
    } = getState();
    const response = await api.put("/user/profile", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data.body });
  } catch (error) {
    console.error("Error updating user profile:", error);
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response?.data?.message || "Failed to update profile",
    });
  }
};
