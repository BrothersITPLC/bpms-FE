import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./features/Auth/components/Login";
import Signup from "./features/Auth/components/Signup";
import Sidebar from "./components/Sidebar";
import UserManagement from "./features/UserManagement/components/UserManagement";
import AssignedTasks from "./features/TaskManagement/components/AssignedTasks";
import Settings from "./views/Settings/components/Settings";
import Bids from "./features/Bids/components/Bids";
import BidPurchaseOrders from "./features/BidPurchaseOrders/components/BidPurchaseOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import Tasks from "./features/TaskManagement/components/Tasks";
import Analytics from "./features/Dashboard/components/Analytics";
import Companies from "./features/Companies/components/companies";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="user-management" element={<UserManagement />} />
          <Route path="assigned-tasks" element={<AssignedTasks />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="bid-purchase-orders" element={<BidPurchaseOrders />} />
          <Route path="bids" element={<Bids />} />
          <Route path="*" element={<NotFound />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="companies" element={<Companies />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
