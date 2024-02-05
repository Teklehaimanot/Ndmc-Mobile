import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { aboutNdmcApi, evidenceBriefApi, newsApi } from "../services";

const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [evidenceBriefApi.reducerPath]: evidenceBriefApi.reducer,
    [aboutNdmcApi.reducerPath]: aboutNdmcApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      evidenceBriefApi.middleware,
      aboutNdmcApi.middleware
    ),
});

setupListeners(store.dispatch);
export default store;
