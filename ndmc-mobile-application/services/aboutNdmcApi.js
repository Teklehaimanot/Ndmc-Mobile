import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `http://192.168.1.2:5000`;
export const aboutNdmcApi = createApi({
  reducerPath: "aboutNdmcApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["AboutNdmc"],
  endpoints: (builder) => ({
    getAboutNdmc: builder.query({
      query: () => `api/v1/aboutNdmc`,
      providesTags: ["AboutNdmc"],
    }),
  }),
});
console.log("abou");
export const { useGetAboutNdmcQuery } = aboutNdmcApi;
