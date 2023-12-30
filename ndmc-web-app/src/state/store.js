import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import catagoryReducer from "./catagory/catagorySlice";
import { userApi } from "../services";
const store = configureStore({
  reducer: {
    auth: authReducer,
    catagory: catagoryReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
