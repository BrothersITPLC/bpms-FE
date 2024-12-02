import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/Auth/apiSlice";
import { WorkspaceApiSlice } from "../features/TaskManagement/apiSlice";
import rootReducer from "./rootReducer";
import { companyAPI } from "../features/Companies/companyApi";
import { bidApi } from "../features/Bids/bidApi";
import { roleApi } from "../features/RoleManagment/api";
import { departmentApi } from "../features/Department/api/department";
import { userAPI } from "../features/UserManagement/userAPI";
import { OwnerAPI } from "../features/InventoryManagement/api/owner";
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

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedAuthReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      [
        apiSlice.middleware,
        companyAPI.middleware,
        bidApi.middleware,
        roleApi.middleware,
        departmentApi.middleware,
        userAPI.middleware,
        OwnerAPI.middleware,
      ],
      WorkspaceApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
