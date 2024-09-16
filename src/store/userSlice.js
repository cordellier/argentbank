import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateUsername: (state, action) => {
      if (state.profile) {
        state.profile.userName = action.payload;
      }
    },
  },
});

export const { setUserProfile, updateUsername } = userSlice.actions;
export default userSlice.reducer;
