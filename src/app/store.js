import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/Auth/apiSlice";
import authReducer from "../features/Auth/authSlice";
import { companyAPI } from "../features/Companies/companyApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
    [companyAPI.reducerPath]: companyAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([apiSlice.middleware, companyAPI.middleware]),
});

export const persistor = persistStore(store);
