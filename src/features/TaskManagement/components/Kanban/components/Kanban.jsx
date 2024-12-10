import React from "react";
import Board from "./Board";

const Kanban = () => {
  return (
    <div className="flex-1 ml-64 p-6 h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

export default Kanban;
