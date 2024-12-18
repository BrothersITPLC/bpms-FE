import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

export const departmentApi = createApi({
  reducerPath: "department-api",
  baseQuery: baseQuery,
  tagTypes: [
    "Department",
    "DepartmentDetail",
    "DepartmentManager",
    "DepartmentEmployee",
  ],

  endpoints: (builder) => ({
    addDepartment: builder.mutation({
      query: (data) => ({
        url: "/users/department/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/department/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DepartmentDetail", id },
      ],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/users/department/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DepartmentDetail", id },
        "Department",
      ],
    }),
    deleteBulkDepartment: builder.mutation({
      query: (data) => ({
        url: `/user/department/bulk-delete/`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    getDepartment: builder.query({
      query: ({ search }) => ({
        url: `/users/department/?search=${search}`,
      }),
      providesTags: ["Department"],
    }),
    getDetailDepartment: builder.query({
      query: ({ id }) => ({
        url: `/users/department/${id}/`,
      }),
      providesTags: (result, error, { id }) => [
        { type: "DepartmentDetail", id },
      ],
    }),
    fetchDepartmentManagers: builder.query({
      query: (departmentId) => `/users/department-managers/${departmentId}/`,
      providesTags: (result, error, departmentId) => [
        { type: "DepartmentManager", id: departmentId },
      ],
    }),
    fetchDepartmentUserStatus: builder.query({
      query: (departmentId) => `/users/department-employee/${departmentId}/`,
      providesTags: (result, error, departmentId) => [
        { type: "DepartmentEmployee", id: departmentId },
      ],
    }),
    updateDepartmentManager: builder.mutation({
      query: (data) => ({
        url: "/users/department-managers/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { departmentId }) => [
        { type: "DepartmentManager", id: departmentId },
      ],
    }),
    // Employee Queries
    updateDepartmentEmployee: builder.mutation({
      query: (data) => ({
        url: "/users/department-employee/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { departmentId }) => [
        { type: "DepartmentEmployee", id: departmentId },
      ],
    }),
    deleteDepartmentEmployee: builder.mutation({
      query: (data) => ({
        url: "/users/department-employee/",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result, error, { departmentId }) => [
        { type: "DepartmentEmployee", id: departmentId },
      ],
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
  useFetchDepartmentManagersQuery,
  useUpdateDepartmentManagerMutation,
  useFetchDepartmentUserStatusQuery,
  useUpdateDepartmentEmployeeMutation,
  useDeleteDepartmentEmployeeMutation,
} = departmentApi;
