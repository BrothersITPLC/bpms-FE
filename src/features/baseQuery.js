import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8001/api/v1/",
  // baseUrl:
  //   "https://bpms-django.internal.wittydesert-75f5c753.francecentral.azurecontainerapps.io:8001/api/v1/",

  credentials: "include",
});

export { baseQuery };

// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "/api/v1/",
//   credentials: "include",
// });

// export { baseQuery };
