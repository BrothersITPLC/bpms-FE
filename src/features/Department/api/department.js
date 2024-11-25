import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

export const departmentApi = createApi({
  reducerPath: "department-api",

  baseQuery: baseQuery,

  endpoints: (builder) => ({
    addDepartment: builder.mutation({
      query: (data) => ({
        url: "/users/department/",
        method: "POST",
        body: data,
      }),
    }),
    updateDepartment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/department/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/users/department/${id}/`,
        method: "DELETE",
      }),
    }),
    deleteBulkDepartment: builder.mutation({
      query: (data) => ({
        url: `/user/department/bulk-delete/`,
        method: "DELETE",
        body: data,
      }),
    }),
    getDepartment: builder.query({
      query: () => ({
        url: `/users/department/`,
      }),
    }),
    getDetailDepartment: builder.query({
      query: ({ id }) => ({
        url: `/users/department/${id}/`,
      }),
    }),
  }),
});

export const {
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useAddDepartmentMutation,
  useDeleteBulkDepartmentMutation,
  useGetDetailDepartmentQuery,
} = departmentApi;
