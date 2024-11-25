import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./features/Auth/components/Profile";
import UserManagement from "./features/UserManagement/components/UserManagement";
import AssignedTasks from "./features/TaskManagement/components/AssignedTasks";
import Bids from "./features/Bids/components/Bids";
import BidPurchaseOrders from "./features/BidPurchaseOrders/components/BidPurchaseOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import Tasks from "./features/TaskManagement/components/Tasks";
import Analytics from "./features/Dashboard/components/Analytics";
import Companies from "./features/Companies/components/companies";
import Kanban from "./features/TaskManagement/components/Kanban/components/Kanban";
import Workspace from "./features/TaskManagement/components/Workspace";
import Space from "./features/TaskManagement/components/Space";
import Folder from "./features/TaskManagement/components/Folder";

//page
import LandingPage from "./page/LandingPage";
import HomePage from "./page/HomePage";
import Auth from "./page/Auth";
import WorkspaceChoose from "./page/WorkspaceChoose";
import Notifications from "./features/Notifications/Notifications";
import ResourceRequests from "./features/Resource/components/ResourceRequests";
import UserResourceRequests from "./features/Resource/components/UserResourceRequests";
import Store from "./features/InventoryManagement/components/Store";
import ProductsTable from "./features/InventoryManagement/components/ProductsTable";
import MonthlyPlan from "./features/WorkReport/components/MonthlyPlan";
import Departments from "./features/Department/components/Departments";
import Role from "./features/RoleManagment/components/role";
import RoleLayout from "./features/RoleManagment/components/layout";
import PermissionManagement from "./features/RoleManagment/components/permission";
import RolePermissionMapping from "./features/RoleManagment/components/rolePermission";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path="choose-space" element={<WorkspaceChoose />}></Route>
          <Route element={<HomePage />}>
            <Route path="user-management" element={<UserManagement />} />
            <Route path="assigned-tasks" element={<AssignedTasks />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="workspace" element={<Workspace />} />
            <Route path="space" element={<Space />} />
            <Route path="folder" element={<Folder />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="settings" element={<Profile />} />
            <Route path="bid-purchase-orders" element={<BidPurchaseOrders />} />
            <Route path="bids" element={<Bids />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="companies" element={<Companies />} />
            <Route path="role-management" element={<RoleLayout />}>
              <Route index element={<Role />} />
              <Route
                path="role-permission-mapping"
                element={<RolePermissionMapping />}
              />
              <Route
                path="permission-management"
                element={<PermissionManagement />}
              />
            </Route>
            <Route path="notifications" element={<Notifications />} />
            <Route path="resource-requests" element={<ResourceRequests />} />
            <Route path="store" element={<Store />} />
            <Route path="products-table" element={<ProductsTable />} />
            <Route
              path="user-resource-requests"
              element={<UserResourceRequests />}
            />
            <Route path="monthly-plan" element={<MonthlyPlan />} />
            <Route path="departments" element={<Departments />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
