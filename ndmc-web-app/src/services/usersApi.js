import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("x-auth", `${token}`);
      }
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, name }) => `/user/?page=${page}&limit=15&name=${name}`,
      providesTags: ["Users"],
    }),

    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userApi;
