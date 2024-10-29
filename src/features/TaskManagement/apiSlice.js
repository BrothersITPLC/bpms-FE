import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Workspace"],
  endpoints: (builder) => ({
    listWorkspaces: builder.query({
      query: () => ({
        url: "space/workspace/",
        method: "GET",
      }),
      providesTags: ["Workspace"],
    }),
    createWorkspace: builder.mutation({
      query: (data) => ({
        url: "space/workspace/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Workspace"],
    }),
    getWorkspaceById: builder.query({
      query: (id) => ({
        url: `space/workspace/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Workspace", id }],
    }),
    updateWorkspaceById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `space/workspace/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Workspace", id }],
    }),
    deleteWorkspaceById: builder.mutation({
      query: (id) => ({
        url: `space/workspace/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Workspace", id }],
    }),
  }),
});

export const {
  useListWorkspacesQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceByIdQuery,
  useUpdateWorkspaceByIdMutation,
  useDeleteWorkspaceByIdMutation,
} = apiSlice;
