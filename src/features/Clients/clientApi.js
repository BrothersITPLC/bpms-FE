import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const clientAPI = createApi({
  reducerPath: "client-api",

  baseQuery: baseQuery,

  endpoints: (builder) => ({
    addClient: builder.mutation({
      query: (data) => ({
        url: "client/",
        method: "POST",
        body: data,
      }),
    }),
    updateClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/${id}/`,
        method: "DELETE",
      }),
    }),
    deleteBulkClient: builder.mutation({
      query: (data) => ({
        url: `/client/bulk-delete/`,
        method: "DELETE",
        body: data,
      }),
    }),
    getClient: builder.query({
      query: ({ search, ordering }) => ({
        url: `/client/?search=${search}&ordering=${
          ordering?.direction == "asc" ? ordering?.key : "-" + ordering?.key
        }`,
      }),
    }),
  }),
});

export const {
  useAddClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
  useGetClientQuery,
  useDeleteBulkClientMutation,
} = clientAPI;
