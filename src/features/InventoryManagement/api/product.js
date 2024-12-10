import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

export const ProductAPI = createApi({
  reducerPath: "ProductAPI",
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (id) => ({
        url: `/product/?owner_id=${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "product", id })),
              { type: "product", id: "LIST" },
            ]
          : [{ type: "product", id: "LIST" }],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "product", id: "LIST" }],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}/`,
        method: "GET",
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category/`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}/?owner_id=${data?.owner}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Workspace", id },
        { type: "Workspace", id: "LIST" },
      ],
    }),
    ///////////////////////////////////////////////////////// Workspace members
    deleteProducts: builder.mutation({
      query: ({ id, owner }) => ({
        url: `/store/${id}/?owner_id=${owner}`,
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
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductsMutation,
  useUpdateProductMutation,
  useGetProductQuery,
  useGetCategoriesQuery,
  //   useCreateWorkspaceMemberMutation,
  //   useCreateSpaceMutation,
  //   useListSpaceQuery,
  //   useUpdateSpaceByIdMutation,
  //   useCreateFolderMutation,
  //   useListFolderQuery,
  //   useListTasksQuery,
  //   useCreateTaskMutation,
} = ProductAPI;
