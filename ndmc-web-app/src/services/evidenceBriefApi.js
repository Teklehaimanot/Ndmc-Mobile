import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const evidenceBriefApi = createApi({
  reducerPath: "evideceBriefApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("x-auth", `${token}`);
      }
    },
  }),
  tagTypes: ["EvidenceBrief"],
  endpoints: (builder) => ({
    getEvidenceBrief: builder.query({
      query: ({ page, title }) =>
        `/evidenceBrief/?page=${page}&limit=15&title=${title}`,
      providesTags: ["EvidenceBrief"],
    }),
    deleteEvidenceBrief: builder.mutation({
      query: (evidenceBriefId) => ({
        url: `evidenceBrief/${evidenceBriefId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EvidenceBrief"],
    }),
    // createEvidenceBrief: builder.mutation({
    //   query: (newData) => ({
    //     url: "/evidenceBrief",
    //     method: "POST",
    //     body: newData,
    //   }),
    //   invalidatesTags: ["EvidenceBrief"],
    // }),
    // updateEvidenceBrief: builder.mutation({
    //   query: ({ newsId, updatedNewsData }) => ({
    //     url: `evidenceBrief/${newsId}`,
    //     method: "PATCH",
    //     body: updatedNewsData,
    //   }),
    //   invalidatesTags: ["EvidenceBrief"],
    // }),
  }),
});

export const {
  useGetEvidenceBriefQuery,
  useDeleteEvidenceBriefMutation,
  //   useCreateNewsMutation,
  //   useUpdateNewsMutation,
} = evidenceBriefApi;
