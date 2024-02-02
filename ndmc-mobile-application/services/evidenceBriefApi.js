import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const evidenceBriefApi = createApi({
  reducerPath: "evideceBriefApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
  }),
  endpoints: (builder) => ({
    getEvidenceBrief: builder.query({
      query: () => `api/v1/evidenceBrief`,
    }),
    downloadPdf: builder.query({
      query: (evidenceBriefId) =>
        `api/v1/evidenceBrief/downloadPdf/${evidenceBriefId}`,
    }),
  }),
});

export const { useGetEvidenceBriefQuery, useDownloadPdfQuery } =
  evidenceBriefApi;