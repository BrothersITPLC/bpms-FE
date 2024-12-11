import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

export const StockinAPI = createApi({
  reducerPath: "stockinApi",
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    getStockin: builder.query({
      query: (id) => ({
        url: `/stockin/?product=${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "stockin", id })),
              { type: "stockin", id: "LIST" },
            ]
          : [{ type: "stockin", id: "LIST" }],
    }),
    // getStockin: builder.query({
    //   query: (id) => ({
    //     url: `/owner/${id}/`,
    //     method: "GET",
    //   }),
    // }),
    createStockin: builder.mutation({
      query: (data) => ({
        url: "/stockin/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "stockin", id: "LIST" }],
    }),

    updateStockin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/stockin/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "stockin", id },
        { type: "stockin", id: "LIST" },
      ],
    }),
    ///////////////////////////////////////////////////////// Workspace members

    //////////////////////////////////////////////////// Space

    ///////////////////////////////////////////////// Folder
  }),
});

export const {
  useCreateStockinMutation,
  useGetStockinQuery,
  useUpdateStockinMutation,

  //   useCreateWorkspaceMemberMutation,
  //   useCreateSpaceMutation,
  //   useListSpaceQuery,
  //   useUpdateSpaceByIdMutation,
  //   useCreateFolderMutation,
  //   useListFolderQuery,
  //   useListTasksQuery,
  //   useCreateTaskMutation,
} = StockinAPI;
