import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("tok", token);

      if (token) {
        headers.set("x-auth", `${token}`);
      }
    },
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, name }) => `/user/?page=${page}&limit=15&name=${name}`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
