import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
