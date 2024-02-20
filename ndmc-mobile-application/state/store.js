import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  aboutNdmcApi,
  collaboratorApi,
  evidenceBriefApi,
  newsApi,
  researchJornalApi,
} from "../services";

const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [evidenceBriefApi.reducerPath]: evidenceBriefApi.reducer,
    [aboutNdmcApi.reducerPath]: aboutNdmcApi.reducer,
    [collaboratorApi.reducerPath]: collaboratorApi.reducer,
    [researchJornalApi.reducerPath]: researchJornalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      newsApi.middleware,
      evidenceBriefApi.middleware,
      aboutNdmcApi.middleware,
      collaboratorApi.middleware,
      researchJornalApi.middleware
    ),
});

setupListeners(store.dispatch);
export default store;
