import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isAuthenticated: false,
    username: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, actions) => {
      state.user = actions.payload;
    },
    removeUser: (state, action) => {
      state.user = { isAuthenticated: false, username: "", email: "" };
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
