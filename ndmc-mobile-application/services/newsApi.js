import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";

const BASE_URL = baseUrl;
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
