import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://4.212.8.161:8001/api/v1/",
  credentials: "include",
});

export { baseQuery };
