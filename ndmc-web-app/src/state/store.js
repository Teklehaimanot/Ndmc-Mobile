import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import catagoryReducer from "./catagory/catagorySlice";
import { aboutNdmcApi, evidenceBriefApi, newsApi, userApi } from "../services";
const store = configureStore({
  reducer: {
    auth: authReducer,
    catagory: catagoryReducer,
    [userApi.reducerPath]: userApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [evidenceBriefApi.reducerPath]: evidenceBriefApi.reducer,
    [aboutNdmcApi.reducerPath]: aboutNdmcApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      newsApi.middleware,
      evidenceBriefApi.middleware,
      aboutNdmcApi.middleware
    ),
});

export default store;
