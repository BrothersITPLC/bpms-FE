import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/Auth/components/Login";
import Signup from "./features/Auth/components/Signup";
import Sidebar from "./components/Sidebar";
import UserManagement from "./features/UserManagement/components/UserManagement";
import OTP from "./features/Auth/components/OTP";
import Products from "./features/Products/components/Products";
import Settings from "./views/Settings/components/Settings";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="sroducts" element={<Products />} />
        <Route path="settings" element={<Settings />} />

        <Route path="sidebar" element={<Sidebar />} />
        <Route path="validate" element={<OTP />} />
      </Routes>
    </Router>
  );
};

export default App;
