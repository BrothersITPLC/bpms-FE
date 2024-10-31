import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const WorkspaceApiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Workspace"],
  endpoints: (builder) => ({
    listWorkspaces: builder.query({
      query: () => ({
        url: "/space/workspace/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Workspace", id })),
              { type: "Workspace", id: "LIST" },
            ]
          : [{ type: "Workspace", id: "LIST" }],
    }),
    createWorkspace: builder.mutation({
      query: (data) => ({
        url: "/space/workspace/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),
    updateWorkspaceById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/space/workspace/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Workspace", id },
        { type: "Workspace", id: "LIST" },
      ],
    }),
    deleteWorkspaceById: builder.mutation({
      query: (id) => ({
        url: `/space/workspace/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Workspace", id },
        { type: "Workspace", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useListWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceByIdMutation,
  useDeleteWorkspaceByIdMutation,
} = WorkspaceApiSlice;
