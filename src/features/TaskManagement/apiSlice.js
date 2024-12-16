import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const WorkspaceApiSlice = createApi({
  reducerPath: "Workspaceapi",
  baseQuery: baseQuery,
  tagTypes: [
    "Workspace",
    "Workspace_members",
    "space",
    "folder",
    "task",
    "Task_assigne",
    "Priority",
    "Status",
  ],
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
      query: ({ workspaceId, memberId }) => ({
        url: `/space/workspace-member/`,
        method: "POST",
        body: {
          workspace: workspaceId,
          member: memberId,
        },
      }),
      invalidatesTags: [{ type: "Workspace_members", id: "LIST" }],
    }),
    deleteWorkspaceMember: builder.mutation({
      query: ({ workspaceId, memberId }) => ({
        url: `/space/workspace-member/${workspaceId}/${memberId}/`,
        method: "DELETE",
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
    createFolder: builder.mutation({
      query: (data) => ({
        url: "/space/folders/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "folder", id: "LIST" }],
    }),
    updateFolderById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/space/folders/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "folder", id },
        { type: "folder", id: "LIST" },
      ],
    }),
    //////////////////////////////////////////////////// Task
    createTask: builder.mutation({
      query: (data) => ({
        url: "/space/task/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "task", id: "LIST" }],
    }),
    listTask: builder.query({
      query: (id) => ({
        url: `/space/task/?folder_id=${id}`,
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
    updateTaskById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/space/task/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "task", id },
        { type: "task", id: "LIST" },
      ],
    }),
    listTaskNonTaskAsigned: builder.query({
      query: (id) => ({
        url: `/space/task-assigne/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task_assigne", id })),
              { type: "Task_assigne", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Workspace_members", id })),
              { type: "Workspace_members", id: "LIST" },
            ]
          : [
              { type: "Task_assigne", id: "LIST" },
              { type: "Workspace_members", id: "LIST" },
            ],
    }),
    createAssignedTask: builder.mutation({
      query: ({ taskId, ownerId }) => ({
        url: `/space/task-assigne/`,
        method: "POST",
        body: {
          task: taskId,
          assigned_to: ownerId,
        },
      }),
      invalidatesTags: [
        { type: "Task_assigne", id: "LIST" },
        { type: "Workspace_members", id: "LIST" },
      ],
    }),
    deleteAssignedTask: builder.mutation({
      query: ({ taskId, ownerId }) => ({
        url: `/space/task-assigne/${taskId}/${ownerId}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Task_assigne", id: "LIST" },
        { type: "Workspace_members", id: "LIST" },
      ],
    }),
    getPriorities: builder.query({
      query: () => "/space/priorities/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Priority", id })),
              { type: "Priority", id: "LIST" },
            ]
          : [{ type: "Priority", id: "LIST" }],
    }),
    createPriority: builder.mutation({
      query: (newPriority) => ({
        url: "/space/priorities/",
        method: "POST",
        body: newPriority,
      }),
      invalidatesTags: [{ type: "Priority", id: "LIST" }],
    }),

    getStatuses: builder.query({
      query: () => "/space/statuses/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Status", id })),
              { type: "Status", id: "LIST" },
            ]
          : [{ type: "Status", id: "LIST" }],
    }),
    createStatus: builder.mutation({
      query: (newStatus) => ({
        url: "/space/statuses/",
        method: "POST",
        body: newStatus,
      }),
      invalidatesTags: [{ type: "Status", id: "LIST" }],
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
  useUpdateFolderByIdMutation,
  useCreateTaskMutation,
  useListTaskQuery,
  useListWorkspacesNonWorkspacesMembersQuery,
  useDeleteWorkspaceMemberMutation,
  useListTaskNonTaskAsignedQuery,
  useCreateAssignedTaskMutation,
  useDeleteAssignedTaskMutation,
  useUpdateTaskByIdMutation,
  useGetPrioritiesQuery,
  useCreatePriorityMutation,
  useGetStatusesQuery,
  useCreateStatusMutation,
} = WorkspaceApiSlice;
