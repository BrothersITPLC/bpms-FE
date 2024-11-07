import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const apiSlice = createApi({
  reducerPath: "Hrapi",
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
  }),
});

export const { useRegisterEmployeeMutation } = apiSlice;
