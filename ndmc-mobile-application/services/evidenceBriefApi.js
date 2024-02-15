import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";

const BASE_URL = baseUrl;
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

export const { useGetEvidenceBriefQuery, useDownloadPdfQuery } =
  evidenceBriefApi;
