import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import { apiSlice } from "../features/Auth/apiSlice";
import { WorkspaceApiSlice } from "../features/TaskManagement/apiSlice";
import { clientAPI } from "../features/Clients/clientApi";
import { bidApi } from "../features/Bids/bidApi";
import { roleApi } from "../features/RoleManagment/api";
import { departmentApi } from "../features/Department/api/department";
import { userAPI } from "../features/UserManagement/userAPI";
import { OwnerAPI } from "../features/InventoryManagement/api/owner";
import { StoreAPI } from "../features/InventoryManagement/api/store";
import { ProductAPI } from "../features/InventoryManagement/api/product";
import { StockinAPI } from "../features/InventoryManagement/api/stockin";
import { StockOutAPI } from "../features/InventoryManagement/api/stockout";
import { resourceApi } from "../features/Resource/resourceApi";
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [WorkspaceApiSlice.reducerPath]: WorkspaceApiSlice.reducer,
  [clientAPI.reducerPath]: clientAPI.reducer,
  [bidApi.reducerPath]: bidApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [OwnerAPI.reducerPath]: OwnerAPI.reducer,
  [StoreAPI.reducerPath]: StoreAPI.reducer,
  [ProductAPI.reducerPath]: ProductAPI.reducer,
  [StockinAPI.reducerPath]: StockinAPI.reducer,
  [StockOutAPI.reducerPath]: StockOutAPI.reducer,
  [resourceApi.reducerPath]: resourceApi.reducer,
  auth: authReducer,
});

export default rootReducer;
