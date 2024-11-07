import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://localhost:8001/api";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8001/api/v1/",
  credentials: "include",
});

export { baseQuery, baseUrl };
