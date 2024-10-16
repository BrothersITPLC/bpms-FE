import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    validateOTP: builder.mutation({
      query: (otpData) => ({
        url: "users/validate/",
        method: "POST",
        body: otpData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "users/logout/",
        method: "POST",
      }),
    }),
    completeProfile: builder.mutation({
      query: (profileData) => ({
        url: "users/complete-profile/",
        method: "PUT",
        body: profileData,
      }),
    }),
    getUserStatus: builder.query({
      query: () => "users/status/",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useValidateOTPMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCompleteProfileMutation,
  useGetUserStatusQuery,
} = apiSlice;
