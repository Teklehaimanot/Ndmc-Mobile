import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutNdmcApi = createApi({
  reducerPath: "aboutNdmcApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
  }),
  tagTypes: ["AboutNdmc"],
  endpoints: (builder) => ({
    getAboutNdmc: builder.query({
      query: () => `api/v1/aboutNdmc`,
      providesTags: ["AboutNdmc"],
    }),
  }),
});

export const { useGetAboutNdmcQuery } = aboutNdmcApi;
