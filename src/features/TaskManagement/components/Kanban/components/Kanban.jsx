import React from "react";
import Sidebar from "../../../../../components/Sidebar";
import Board from "./Board";

const Kanban = () => {
  return (
    <div className="flex">
      <>
        <Sidebar />
        <div className="h-screen w-full bg-neutral-900 text-neutral-50">
          <Board />
        </div>
      </>
    </div>
  );
};

export default Kanban;
