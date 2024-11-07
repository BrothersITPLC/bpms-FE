import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import { apiSlice } from "../features/Auth/apiSlice";
import { WorkspaceApiSlice } from "../features/TaskManagement/apiSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [WorkspaceApiSlice.reducerPath]: WorkspaceApiSlice.reducer,
  auth: authReducer,
});

export default rootReducer;
