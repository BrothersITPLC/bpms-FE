import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const WorkspaceApiSlice = createApi({
  reducerPath: "Workspaceapi",
  baseQuery: baseQuery,
  tagTypes: ["Workspace", "Workspace_members", "space", "folder"],
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
    ///////////////////////////////////////////////////////// Workspace members
    listWorkspacesNonWorkspacesMembers: builder.query({
      query: (id) => ({
        url: `/space/workspace-member/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Workspace_members", id })),
              { type: "Workspace_members", id: "LIST" },
            ]
          : [{ type: "Workspace_members", id: "LIST" }],
    }),
    createWorkspaceMember: builder.mutation({
      query: ({ workspaceId, memberId, role }) => ({
        url: `/workspace-member/`,
        method: "POST",
        body: {
          workspace: workspaceId,
          member: memberId,
          role,
        },
      }),
      invalidatesTags: [{ type: "Workspace_members", id: "LIST" }],
    }),
    //////////////////////////////////////////////////// Space
    listSpace: builder.query({
      query: (id) => ({
        url: `/space/spaces/?workspace_id=${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "space", id })),
              { type: "space", id: "LIST" },
            ]
          : [{ type: "space", id: "LIST" }],
    }),
    createSpace: builder.mutation({
      query: (data) => ({
        url: "/space/spaces/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "space", id: "LIST" }],
    }),
    updateSpaceById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/space/spaces/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "space", id },
        { type: "space", id: "LIST" },
      ],
    }),
    //////////////////////////////////////////////////// Folder

    createFolder: builder.mutation({
      query: (data) => ({
        url: "/space/folders/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "folder", id: "LIST" }],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: "/space/task/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "task", id: "LIST" }],
    }),
    listTasks: builder.query({
      query: (id) => ({
        url: `/space/task/`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "task", id })),
              { type: "task", id: "LIST" },
            ]
          : [{ type: "task", id: "LIST" }],
    }),
    listFolder: builder.query({
      query: (id) => ({
        url: `/space/folders/?space_id=${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "folder", id })),
              { type: "folder", id: "LIST" },
            ]
          : [{ type: "folder", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyListWorkspacesNonWorkspacesMembersQuery,
  useListWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceByIdMutation,
  useCreateWorkspaceMemberMutation,
  useCreateSpaceMutation,
  useListSpaceQuery,
  useUpdateSpaceByIdMutation,
  useCreateFolderMutation,
  useListFolderQuery,
  useListTasksQuery,
  useCreateTaskMutation,
} = WorkspaceApiSlice;
