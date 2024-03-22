import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";

const BASE_URL = baseUrl;
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("x-auth", `${token}`);
      }
    },
  }),
  tagTypes: ["News", "Comments"],
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ page, limit }) => `api/v1/news?page=${page}&limit=${limit}`,
      providesTags: ["News"],
    }),

    postComments: builder.mutation({
      query: (newComment) => ({
        url: "api/v1/news/createComment/65f15be4cfcf26ec0fae89e4",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["News"],
    }),
    getCommentsById: builder.query({
      query: (newsid) => `api/v1/news/${newsid}/comments`,
      providesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  usePostCommentsMutation,
  useGetCommentsByIdQuery,
} = newsApi;
