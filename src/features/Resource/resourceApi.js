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
  }),
});

export const {
  useDeleteResourceMutation,
  useAddResourceMutation,
  useUpdateTaskStatusMutation,
  useUpdateResourceMutation,
} = resourceApi;
