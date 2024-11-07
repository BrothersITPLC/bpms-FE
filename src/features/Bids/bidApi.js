import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const bidApi = createApi({
  reducerPath: "bidApi",
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    addRFP: builder.mutation({
      query: (data) => ({
        url: "rfp/",
        method: "POST",
        body: data,
      }),
    }),
    updateRFP: builder.mutation({
      query: ({ id, data }) => ({
        url: `/rfp/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteRFP: builder.mutation({
      query: (id) => ({
        url: `/rfp/${id}/`,
        method: "DELETE",
      }),
    }),
    getRFP: builder.query({
      query: () => ({
        url: `/rfp/`,
      }),
    }),
    getDetailRFP: builder.query({
      query: (id) => ({
        url: `/rfp/${id}/`,
      }),
    }),
  }),
});

export const {
  useDeleteRFPMutation,
  useAddRFPMutation,
  useUpdateRFPMutation,
  useGetRFPQuery,
  useGetDetailRFPQuery,
} = bidApi;
