import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../features/Auth/components/Signup";
import Login from "../features/Auth/components/Login";
import NotFound from "../components/NotFound";

function Auth() {
  return (
    <div>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Auth;
