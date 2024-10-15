import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/Auth/components/Login";
import Signup from "./features/Auth/components/Signup";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
