import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import catagoryReducer from "./catagory/catagorySlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    catagory: catagoryReducer,
  },
});

export default store;
