import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authReducers";
import userReducers from "./reducers/userReducers";

// Création du rootReducer
const rootReducer = {
  auth: authReducers,
  user: userReducers,
};

// Création du store avec configureStore, qui intègre automatiquement redux-thunk
export const store = configureStore({
  reducer: rootReducer,
});

export default store;
