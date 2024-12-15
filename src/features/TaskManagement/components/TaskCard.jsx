import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  useListTaskNonTaskAsignedQuery,
  useCreateAssignedTaskMutation,
  useDeleteAssignedTaskMutation,
  useUpdateTaskByIdMutation,
  useGetPrioritiesQuery,
  useGetStatusesQuery,
} from "../apiSlice";
export default function TaskCard({ tasks }) {
  const [task, setTask] = useState(tasks);
  useEffect(() => {
    if (tasks) {
      setTask(tasks);
    }
  }, [tasks]);
  const [isOpen, setIsOpen] = useState(false);
  const avatar = "/placeholder.svg";
  const [createAssignedTask] = useCreateAssignedTaskMutation();
  const [deleteAssignedTask] = useDeleteAssignedTaskMutation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssigneeMenuOpen, setIsAssigneeMenuOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsAssigneeMenuOpen(!isAssigneeMenuOpen);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    "in progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  ////////////////////////////////asigne
  const {
    data: userListData,
    isLoading: userListIsLoading,
    error: userListError,
  } = useListTaskNonTaskAsignedQuery(tasks?.id);

  let sortedUsers = [];
  if (userListData) {
    sortedUsers = [...userListData].sort((a, b) => b.isAsigned - a.isAsigned);
  }
  const handleAssigneeChange = async (user) => {
    if (user.isAsigned) {
      try {
        const result = await deleteAssignedTask({
          taskId: tasks.id,
          ownerId: user.id,
        }).unwrap();
        console.log("Member added successfully:", result);
      } catch (error) {
        console.error("Failed to add member:", error);
      }
    } else {
      try {
        const result = await createAssignedTask({
          taskId: tasks.id,
          ownerId: user.id,
        }).unwrap();
        console.log("Member added successfully:", result);
      } catch (error) {
        console.error("Failed to add member:", error);
      }
    }
  };

  ///////////////////get priority and status
  const [isEditable, setIsEditable] = useState({
    title: false,
    description: false,
  });
  const { data: priorities = [], isLoading: prioritiesIsLoading } =
    useGetPrioritiesQuery();
  const { data: statuses = [], isLoading: statusesIsLoading } =
    useGetStatusesQuery();
  const [updateTaskById] = useUpdateTaskByIdMutation();
  const handleUpdate = async (field, value) => {
    try {
      const updatedTask = { ...task, [field]: value };
      setTask(updatedTask);
      await updateTaskById({ id: tasks.id, [field]: value });
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleTitleChange = (e) =>
    handleUpdate("name", e.target.textContent.trim());
  const handleDescriptionChange = (e) =>
    handleUpdate("description", e.target.textContent.trim());
  const handleStatusChange = (status) => handleUpdate("status", status);
  const handlePriorityChange = (priority) => handleUpdate("priority", priority);
  const handleDateChange = (field, value) => handleUpdate(field, value);

  return (
    <div className="w-full max-w-xl p-4 bg-white rounded-lg shadow-sm border border-gray-100 relative">
      <Accordion
        open={isOpen}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        }
      >
        <AccordionHeader
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between mb-2"
        >
          <span className="text-sm text-gray-600">{task?.name}</span>
        </AccordionHeader>
        <AccordionBody>
          <div className="flex justify-between items-center gap-4 my-2">
            <h3
              className="text-lg font-medium mb-2 cursor-pointer"
              contentEditable={isEditable.title}
              onBlur={handleTitleChange}
              onClick={() =>
                setIsEditable((prev) => ({ ...prev, title: true }))
              }
            >
              {task?.name}
            </h3>
            <div className="flex items-center gap-5 relative">
              {/* Avatar icon */}
              <Tooltip content="Asigne">
                <div className="flex items-center gap-5">
                  <Menu placement="bottom-start">
                    <MenuHandler>
                      <Avatar
                        src={avatar}
                        alt={avatar}
                        className="cursor-pointer w-10 h-10"
                      />
                    </MenuHandler>
                    <MenuList className="z-10">
                      {sortedUsers.map((user, index) => (
                        <div key={user.id}>
                          {index > 0 &&
                            sortedUsers[index - 1].isAsigned &&
                            !user.isAsigned && (
                              <hr className="my-2 border-t border-gray-300" />
                            )}
                          <MenuItem
                            onClick={() => handleAssigneeChange(user)}
                            className="flex items-center gap-3"
                          >
                            <Avatar src={avatar} alt={avatar} size="sm mx-4" />
                            <span>{user.username}</span>
                            {user.isAsigned ? (
                              <span className="text-red-600 mx-4">x</span>
                            ) : (
                              <span className="text-green-500 mx-4">+</span>
                            )}
                          </MenuItem>
                        </div>
                      ))}
                    </MenuList>
                  </Menu>
                </div>
              </Tooltip>
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50">
                        Delete Task
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p
            className="text-gray-600 text-sm mb-4 cursor-pointer"
            contentEditable={isEditable.description}
            onBlur={handleDescriptionChange}
            onClick={() =>
              setIsEditable((prev) => ({ ...prev, description: true }))
            }
          >
            {task?.description}
          </p>

          <div className="flex flex-wrap gap-2 items-center justify-between">
            <select
              value={task?.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`rounded-full text-xs font-medium`}
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>

            <select
              value={task?.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className={`rounded-full text-xs font-medium`}
            >
              {priorities.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={task?.start_date?.split("T")[0] || ""}
                  onChange={(e) =>
                    handleDateChange("start_date", e.target.value)
                  }
                  className="border-none bg-transparent"
                />
              </div>
              <span>-</span>
              <input
                type="date"
                value={task?.end_date?.split("T")[0] || ""}
                onChange={(e) => handleDateChange("end_date", e.target.value)}
                className="border-none bg-transparent"
              />
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
}
