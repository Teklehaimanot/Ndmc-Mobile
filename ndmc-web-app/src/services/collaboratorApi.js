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
    createCollaborator: builder.mutation({
      query: (newData) => ({
        url: "/collaborator",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Collaborator"],
    }),
    updateCollaborator: builder.mutation({
      query: ({ collaboratorId, updatedCollaboratorData }) => ({
        url: `collaborator/${collaboratorId}`,
        method: "PATCH",
        body: updatedCollaboratorData,
      }),
      invalidatesTags: ["Collaborator"],
    }),
  }),
});

export const {
  useGetCollaboratorsQuery,
  useDeleteCollaboratorMutation,
  useCreateCollaboratorMutation,
  useUpdateCollaboratorMutation,
} = collaboratorApi;
