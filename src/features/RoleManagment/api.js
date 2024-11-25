import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const roleApi = createApi({
  reducerPath: "role-api",

  baseQuery: baseQuery,

  endpoints: (builder) => ({
    addRole: builder.mutation({
      query: (data) => ({
        url: "/users/groups/create/",
        method: "POST",
        body: data,
      }),
    }),
    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/groups/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteRole: builder.mutation({
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
    getRoles: builder.query({
      query: () => ({
        url: `/users/groups`,
      }),
    }),
  }),
});

export const {
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetRolesQuery,
  useDeleteBulkCompanyMutation,
} = roleApi;
