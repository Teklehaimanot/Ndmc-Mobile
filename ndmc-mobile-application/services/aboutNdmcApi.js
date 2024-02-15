import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";

const BASE_URL = baseUrl;
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
export const { useGetAboutNdmcQuery } = aboutNdmcApi;
