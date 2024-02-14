import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

const BASE_URL = `http://192.168.1.2:5000`;
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ page, limit }) => `api/v1/news?page=${page}&limit=${limit}`,
      providesTags: ["News"],
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
