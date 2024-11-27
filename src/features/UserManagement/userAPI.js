import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const userAPI = createApi({
  reducerPath: "users-api",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: "users/register/",
        method: "POST",
        body: newEmployee,
      }),
    }),
    getEmployee: builder.query({
      query: () => ({
        url: "users/users/",
        method: "GET",
      }),
    }),
    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/users/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: ({ id }) => ({
        url: `users/users/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = userAPI;
