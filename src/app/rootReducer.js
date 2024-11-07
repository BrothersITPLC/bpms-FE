import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import { apiSlice } from "../features/Auth/apiSlice";
import { WorkspaceApiSlice } from "../features/TaskManagement/apiSlice";
import { companyAPI } from "../features/Companies/companyApi";
import { bidApi } from "../features/Bids/bidApi";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [WorkspaceApiSlice.reducerPath]: WorkspaceApiSlice.reducer,
  [companyAPI.reducerPath]: companyAPI.reducer,
  [bidApi.reducerPath]: bidApi.reducer,
  auth: authReducer,
});

export default rootReducer;
