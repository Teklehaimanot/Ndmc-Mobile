import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => `api/v1/news`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
