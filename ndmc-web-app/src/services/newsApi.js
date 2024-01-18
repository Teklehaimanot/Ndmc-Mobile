import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("x-auth", `${token}`);
      }
    },
  }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ page, title }) => `/news/?page=${page}&limit=15&title=${title}`,
      providesTags: ["News"],
    }),
    deleteNews: builder.mutation({
      query: (newsId) => ({
        url: `news/${newsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
    createNews: builder.mutation({
      query: (newData) => ({
        url: "/news",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const { useGetNewsQuery, useDeleteNewsMutation, useCreateNewsMutation } =
  newsApi;
