import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3OWJjZWZmMzU1NThiMWM3YWM4OGYiLCJlbWFpbCI6ImVuYmlzaC5ibHRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzExMDI2MTYxfQ.NSkkJQU33nI8kp6eiTgf8Xu6UszDSIgLWcZh3RrfmhE",
  isAuthenticated: false,
  loading: true,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
