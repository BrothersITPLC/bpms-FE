import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/Auth/components/Login";
import Signup from "./features/Auth/components/Signup";
import Sidebar from "./components/Sidebar";
import UserManagement from "./features/UserManagement/components/UserManagement";
import OTP from "./features/Auth/components/OTP";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="UserManagement" element={<UserManagement />} />
        <Route path="Products" element={<Products />} />
        <Route path="Settings" element={<Settings />} />

        <Route path="Sidebar" element={<Sidebar />} />
        <Route path="OTP" element={<OTP />} />
      </Routes>
    </Router>
  );
};

export default App;
