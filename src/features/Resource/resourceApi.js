import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const resourceApi = createApi({
  reducerPath: "resourceApi",
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    addResource: builder.mutation({
      query: (data) => ({
        url: "resource_request/",
        method: "POST",
        body: data,
      }),
    }),
    getResource: builder.query({
      query: ({ search }) => ({
        url: `resource_request/?search=${search}`,
        method: "GET",
      }),
    }),
    updateTaskStatus: builder.mutation({
      query: (data) => ({
        url: "bid-task/",
        method: "POST",
        body: data,
      }),
    }),
    updateResource: builder.mutation({
      query: ({ id, data }) => ({
        url: `/resource_request/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    // updateLott: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/lot/${id}/`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    deleteResource: builder.mutation({
      query: (id) => ({
        url: `/resource_request/${id}/`,
        method: "DELETE",
      }),
    }),
    getResourceIApprove: builder.query({
      query: (search) => ({
        url: `/i_approve_resource/?search=${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDeleteResourceMutation,
  useAddResourceMutation,
  useUpdateTaskStatusMutation,
  useUpdateResourceMutation,
  useGetResourceQuery,
  useGetResourceIApproveQuery,
} = resourceApi;
