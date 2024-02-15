import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";

const BASE_URL = baseUrl;
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

export const { useGetCollaboratorsQuery } = collaboratorApi;
