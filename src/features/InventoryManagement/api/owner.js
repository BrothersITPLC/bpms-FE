import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

export const OwnerAPI = createApi({
  reducerPath: "OwnerAPI",
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    getOwners: builder.query({
      query: () => ({
        url: "/owner/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "owner", id })),
              { type: "owner", id: "LIST" },
            ]
          : [{ type: "owner", id: "LIST" }],
    }),
    getOwner: builder.query({
      query: (id) => ({
        url: `/owner/${id}/`,
        method: "GET",
      }),
    }),
    createOwner: builder.mutation({
      query: (data) => ({
        url: "/owner/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "owner", id: "LIST" }],
    }),

    updateOwner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/owner/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Workspace", id },
        { type: "Workspace", id: "LIST" },
      ],
    }),
    ///////////////////////////////////////////////////////// Workspace members
    deleteOwner: builder.mutation({
      query: (id) => ({
        url: `/owner/${id}/`,
        method: "DELETE",
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
  }),
});

export const {
  useCreateOwnerMutation,
  useGetOwnersQuery,
  useUpdateOwnerMutation,
  useDeleteOwnerMutation,
  useGetOwnerQuery,
  //   useCreateWorkspaceMemberMutation,
  //   useCreateSpaceMutation,
  //   useListSpaceQuery,
  //   useUpdateSpaceByIdMutation,
  //   useCreateFolderMutation,
  //   useListFolderQuery,
  //   useListTasksQuery,
  //   useCreateTaskMutation,
} = OwnerAPI;
