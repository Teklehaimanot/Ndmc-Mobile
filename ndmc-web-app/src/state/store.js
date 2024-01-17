import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import catagoryReducer from "./catagory/catagorySlice";
import { newsApi, userApi } from "../services";
const store = configureStore({
  reducer: {
    auth: authReducer,
    catagory: catagoryReducer,
    [userApi.reducerPath]: userApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, newsApi.middleware),
});

export default store;
