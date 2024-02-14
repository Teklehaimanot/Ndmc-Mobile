import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `http://192.168.1.2:5000`;
export const evidenceBriefApi = createApi({
  reducerPath: "evideceBriefApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["EvidenceBrief"],
  endpoints: (builder) => ({
    getEvidenceBrief: builder.query({
      query: ({ page, limit }) =>
        `api/v1/evidenceBrief?page=${page}&limit=${limit}/`,
      providesTags: ["EvidenceBrief"],
    }),
  }),
});
console.log("evidence");
export const { useGetEvidenceBriefQuery, useDownloadPdfQuery } =
  evidenceBriefApi;
