import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
    updateUsername: (state, action) => {
      if (state.profile) {
        return {
          ...state,
          profile: {
            ...state.profile,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
          },
        };
      }
      return state;
    },
    clearUserProfile: () => {
      return { ...initialState };
    },
  },
});

export const { setUserProfile, updateUsername, clearUserProfile } =
  userSlice.actions;
export default userSlice.reducer;
