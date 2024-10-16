import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
