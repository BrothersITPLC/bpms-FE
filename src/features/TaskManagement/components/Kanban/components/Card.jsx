import React from "react";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";
import { FiUser, FiCalendar, FiFlag } from "react-icons/fi"; // Import icons for assignee, due date, and priority

const Card = ({
  title,
  id,
  column,
  handleDragStart,
  assignee,
  dueDate,
  priority,
}) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, { title, id, column, assignee, dueDate, priority })
        }
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>

        {/* Display Assignee */}
        <div className="mt-1 flex items-center text-neutral-400 text-xs">
          <FiUser className="mr-1" />
          <span>{assignee || "Unassigned"}</span>
        </div>

        {/* Display Due Date */}
        <div className="mt-1 flex items-center text-neutral-400 text-xs">
          <FiCalendar className="mr-1" />
          <span>
            {dueDate ? new Date(dueDate).toLocaleDateString() : "No Due Date"}
          </span>
        </div>

        {/* Display Priority */}
        <div className="mt-1 flex items-center text-neutral-400 text-xs">
          <FiFlag className="mr-1" />
          <span>{priority}</span>
        </div>
      </motion.div>
    </>
  );
};

export default Card;
