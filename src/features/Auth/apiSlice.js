import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { setUser } from "./authSlice";

export const apiSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "token/",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const userData = data.data?.user || data.user;
        if (!userData) {
          throw new Error("User data is missing from the response.");
        }
        dispatch(
          setUser({
            user: {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              first_name: userData.first_name,
              last_name: userData.last_name,
            },
          })
        );
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    completeProfile: builder.mutation({
      query: (data) => ({
        url: "users/complete-profile/",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useCompleteProfileMutation,
} = apiSlice;
