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
import OTP from "./features/Auth/components/OTP";
import Products from "./features/Products/components/Products";
import Settings from "./views/Settings/components/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

const App = () => {
  console.log("Cookies after login:", document.cookie);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="validate" element={<OTP />} />

        <Route element={<ProtectedRoute />}>
          <Route path="user-management" element={<UserManagement />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
