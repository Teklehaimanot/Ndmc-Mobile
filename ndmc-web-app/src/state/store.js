import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import catagoryReducer from "./catagory/catagorySlice";
import {
  aboutNdmcApi,
  collaboratorApi,
  evidenceBriefApi,
  newsApi,
  userApi,
} from "../services";
const store = configureStore({
  reducer: {
    auth: authReducer,
    catagory: catagoryReducer,
    [userApi.reducerPath]: userApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [evidenceBriefApi.reducerPath]: evidenceBriefApi.reducer,
    [aboutNdmcApi.reducerPath]: aboutNdmcApi.reducer,
    [collaboratorApi.reducerPath]: collaboratorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      newsApi.middleware,
      evidenceBriefApi.middleware,
      aboutNdmcApi.middleware,
      collaboratorApi.middleware
    ),
});

export default store;
