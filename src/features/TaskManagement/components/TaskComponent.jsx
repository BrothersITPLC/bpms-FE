import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

const TaskComponent = ({ task }) => {
  return (
    <div className="ml-6 mt-2 flex items-center space-x-2">
      <CheckCircleIcon className="h-4 w-4 text-blue-500" />
      <Typography variant="small">{task.name}</Typography>
      <input type="date" value={task.startDate} className="text-xs" />
      <input type="date" value={task.endDate} className="text-xs" />
      <select value={task.assignee} className="text-xs">
        <option>User 1</option>
        <option>User 2</option>
        <option>User 3</option>
      </select>
    </div>
  );
};

export default TaskComponent;
