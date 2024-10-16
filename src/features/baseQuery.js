import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearUser } from "./Auth/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1/",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "token/refresh/", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearUser());
    }
  }

  return result;
};

export { baseQuery, baseQueryWithReauth };
