import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import Signup from "./features/Auth/Signup";
import Sidebar from "./components/Sidebar";
import UserManagement from "./features/UserManagement/UserManagement";
import OTP from "./features/Auth/OTP";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="sidebar" element={<Sidebar />} />
        <Route path="validate" element={<OTP />} />
      </Routes>
    </Router>
  );
};

export default App;
