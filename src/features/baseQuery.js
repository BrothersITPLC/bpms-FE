import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearUser } from "./Auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8001/api/v1/",
  credentials: "include",
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshResult = await baseQuery(
//       {
//         url: "token/refresh/",
//         method: "POST",
//         body: {},
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(clearUser());
//     }
//   }

//   return result;
// };
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const state = api.getState();
  const accessToken = state.auth.accessToken;

  // Add the access token to the headers
  const modifiedArgs = {
    ...args,
    headers: {
      ...args.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };

  let result = await baseQuery(modifiedArgs, api, extraOptions);

  // If access token is expired, attempt to refresh the token
  if (result.error && result.error.status === 401) {
    const refreshToken = state.auth.refreshToken;

    const refreshResult = await baseQuery(
      {
        url: "token/refresh/",
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Store the new access token
      api.dispatch(
        setUser({
          ...state.auth.user,
          accessToken: refreshResult.data.access,
          refreshToken: state.auth.refreshToken, // The refresh token remains the same
        })
      );

      // Retry the original request with the new access token
      result = await baseQuery(modifiedArgs, api, extraOptions);
    } else {
      // If refresh also fails, log out the user
      api.dispatch(clearUser());
    }
  }

  return result;
};

export { baseQuery, baseQueryWithReauth };
