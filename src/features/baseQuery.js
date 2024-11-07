import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8801/api/v1/",
  credentials: "include",
});

export { baseQuery, baseUrl };
