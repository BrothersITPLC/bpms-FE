import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/Auth/apiSlice";
import authReducer from "../features/Auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
