import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

export const StockOutAPI = createApi({
  reducerPath: "stockOutApi",
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    getStockOut: builder.query({
      query: (id) => ({
        url: `/stockout/?product=${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "stockout", id })),
              { type: "stockout", id: "LIST" },
            ]
          : [{ type: "stockout", id: "LIST" }],
    }),
    // getStockin: builder.query({
    //   query: (id) => ({
    //     url: `/owner/${id}/`,
    //     method: "GET",
    //   }),
    // }),
    createStockOut: builder.mutation({
      query: (data) => ({
        url: "/stockout/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "StockOut", id: "LIST" }],
    }),

    updateStockOut: builder.mutation({
      query: ({ id, data }) => ({
        url: `/stockout/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "StockOut", id },
        { type: "StockOut", id: "LIST" },
      ],
    }),
    ///////////////////////////////////////////////////////// Workspace members

    //////////////////////////////////////////////////// Space

    ///////////////////////////////////////////////// Folder
  }),
});

export const {
  useCreateStockOutMutation,
  useGetStockOutQuery,
  useUpdateStockOutMutation,

  //   useCreateWorkspaceMemberMutation,
  //   useCreateSpaceMutation,
  //   useListSpaceQuery,
  //   useUpdateSpaceByIdMutation,
  //   useCreateFolderMutation,
  //   useListFolderQuery,
  //   useListTasksQuery,
  //   useCreateTaskMutation,
} = StockOutAPI;
