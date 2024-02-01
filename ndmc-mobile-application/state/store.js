import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "../services";

const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export default store;
