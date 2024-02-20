import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";

const BASE_URL = baseUrl;
export const researchJornalApi = createApi({
  reducerPath: "researchJornalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["ResearchJornal"],
  endpoints: (builder) => ({
    getJornals: builder.query({
      query: ({ page, title }) =>
        `api/v1/researches?page=${page}&title=${title}`,
      providesTags: ["ResearchJornal"],
    }),
  }),
});

export const { useGetJornalsQuery } = researchJornalApi;
