import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const companyAPI = createApi({
  reducerPath: "company-api",

  baseQuery: baseQuery,

  endpoints: (builder) => ({
    addCompany: builder.mutation({
      query: (data) => ({
        url: "company/",
        method: "POST",
        body: data,
      }),
    }),
    updateCompany: builder.mutation({
      query: ({ id, data }) => ({
        url: `/company/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/company/${id}/`,
        method: "DELETE",
      }),
    }),
    deleteBulkCompany: builder.mutation({
      query: (data) => ({
        url: `/company/bulk-delete/`,
        method: "DELETE",
        body: data,
      }),
    }),
    getCompany: builder.query({
      query: ({ search, ordering }) => ({
        url: `/company/?search=${search}&ordering=${
          ordering?.direction == "asc" ? ordering?.key : "-" + ordering?.key
        }`,
      }),
    }),
  }),
});

export const {
  useAddCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyMutation,
  useGetCompanyQuery,
  useDeleteBulkCompanyMutation,
} = companyAPI;
