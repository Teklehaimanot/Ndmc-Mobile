import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const evidenceBriefApi = createApi({
  reducerPath: "evideceBriefApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
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
console.log("ev");
export const { useGetEvidenceBriefQuery, useDownloadPdfQuery } =
  evidenceBriefApi;
