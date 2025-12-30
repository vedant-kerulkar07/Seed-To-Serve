import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,   // will store { username }
  role: null,   // "FARMER" | "BUYER"
  token: null,  // JWT token
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, role, token } = action.payload;

      state.isLoggedIn = true;
      state.user = user || null;
      state.role = role || null;
      state.token = token || null;
    },

    removeUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;