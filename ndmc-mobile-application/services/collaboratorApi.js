import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collaboratorApi = createApi({
  reducerPath: "collaboratorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
  }),
  tagTypes: ["Collaborator"],
  endpoints: (builder) => ({
    getCollaborators: builder.query({
      query: () => `api/v1/collaborator`,
      providesTags: ["Collaborator"],
    }),
  }),
});

console.log("g");
export const { useGetCollaboratorsQuery } = collaboratorApi;
