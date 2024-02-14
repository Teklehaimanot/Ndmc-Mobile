import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `http://192.168.1.2:5000`;
export const collaboratorApi = createApi({
  reducerPath: "collaboratorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Collaborator"],
  endpoints: (builder) => ({
    getCollaborators: builder.query({
      query: () => `api/v1/collaborator`,
      providesTags: ["Collaborator"],
    }),
  }),
});

console.log("colab");
export const { useGetCollaboratorsQuery } = collaboratorApi;
