import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collaboratorApi = createApi({
  reducerPath: "collaboratorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("x-auth", `${token}`);
      }
    },
  }),
  tagTypes: ["Collaborator"],
  endpoints: (builder) => ({
    getCollaborators: builder.query({
      query: () => `/collaborator`,
      providesTags: ["Collaborator"],
    }),
    deleteCollaborator: builder.mutation({
      query: (collaboratorId) => ({
        url: `collaborator/${collaboratorId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collaborator"],
    }),
    // createNews: builder.mutation({
    //   query: (newData) => ({
    //     url: "/news",
    //     method: "POST",
    //     body: newData,
    //   }),
    //   invalidatesTags: ["Collaborator"],
    // }),
    // updateNews: builder.mutation({
    //   query: ({ newsId, updatedNewsData }) => ({
    //     url: `news/${newsId}`,
    //     method: "PATCH",
    //     body: updatedNewsData,
    //   }),
    //   invalidatesTags: ["Collaborator"],
    // }),
  }),
});

export const { useGetCollaboratorsQuery, useDeleteCollaboratorMutation } =
  collaboratorApi;
