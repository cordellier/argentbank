import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: null,
      };
    },
    loginFail: (state, action) => {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };
    },
    logout: () => {
      return { ...initialState };
    },
  },
});

export const { loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
