import React, { useState } from "react";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import {
  Card,
  Input,
  Checkbox,
  CardHeader,
  IconButton,
  Typography,
  Button,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";

const TABLE_HEAD = [
  {
    head: "Workspace ID",
  },
  {
    head: "Workspace Name",
  },
  {
    head: "Workspace discription",
  },
];

const TABLE_ROWS = [
  {
    task_id: "T-1",
    task_name: "Technical Document Preparation",
    discription: "work space discription",
  },
  {
    task_id: "T-2",
    task_name: "Financial Document Preparation",
    discription: "work space discription",
  },
  {
    task_id: "T-3",
    task_name: "Bid Bond Preparation",
    discription: "work space discription",
  },
  {
    task_id: "T-4",
    task_name: "Clarification Response",
    discription: "work space discription",
  },
];

const Workspace = () => {
  // Modal states for "Add Task" and PlusCircleIcon (task details)
  const [WorkspaceOpen, setWorkspaceOpen] = useState(false);
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false);

  // Form states
  const [newTaskData, setNewTaskData] = useState({
    task_id: "",
    task_name: "",
  });
  const [taskDetailsData, setTaskDetailsData] = useState({
    task_name: "",
    assignee: "",
    due_date: "",
  });

  // Toggle modals
  const handleWorkspaceOpen = () => setWorkspaceOpen(!WorkspaceOpen);
  const handleTaskDetailsOpen = () => setTaskDetailsOpen(!taskDetailsOpen);

  // Handle input changes for "Add Task" form
  const handleNewWorkspaceChange = (event) => {
    const { name, value } = event.target;
    setNewTaskData({ ...newTaskData, [name]: value });
  };

  // Handle input changes for task details modal
  const handleTaskDetailsChange = (event) => {
    const { name, value } = event.target;
    setTaskDetailsData({ ...taskDetailsData, [name]: value });
  };

  // Handle "Add Task" form submission
  const handleNewWorkspaceSubmit = (event) => {
    event.preventDefault();
    console.log("New Task Added:", newTaskData);
    handleWorkspaceOpen(); // Close modal after submission
  };

  // Handle PlusCircleIcon click and populate task details modal
  const handleIconClick = (taskName) => {
    setTaskDetailsData({ ...taskDetailsData, task_name: taskName });
    handleTaskDetailsOpen(); // Open the task details modal
  };

  // Handle task details form submission
  const handleTaskDetailsSubmit = (event) => {
    event.preventDefault();
    console.log("Task Details Submitted:", taskDetailsData);
    handleTaskDetailsOpen(); // Close modal after submission
  };

  return (
    <div className="flex w-full">
      <Card className="h-full w-fit flex-1">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="flex justify-between">
            <div className="w-fit">
              <Input
                label="Search WorkSpace"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* Button to open "Add Task" modal */}
            <Button
              className="bg-primary1 flex items-center gap-3"
              size="sm"
              onClick={handleWorkspaceOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Workspace
            </Button>
          </div>
        </CardHeader>

        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(({ head, icon }) => (
                <th key={head} className="border-b border-gray-300 p-4">
                  <div className="flex items-center gap-1">
                    {icon}
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ task_id, task_name, discription }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

              return (
                <tr key={task_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-1">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {task_id}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {task_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {discription}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-2">
                      {/* Icon button to open task details modal */}
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => handleIconClick(task_name)}
                      >
                        <UserIcon
                          strokeWidth={3}
                          className="h-4 w-4 text-gray-900"
                        />
                      </IconButton>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex items-center gap-2">
                      {/* Icon button to open task details modal */}
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => handleIconClick(task_name)}
                      >
                        <PencilSquareIcon
                          strokeWidth={3}
                          className="h-4 w-4 text-gray-900"
                        />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Modal for Adding a Workspace */}
      <Modal
        open={WorkspaceOpen}
        onClose={handleWorkspaceOpen}
        title="Add New Workspace"
        confirmText="Submit"
        onConfirm={handleNewWorkspaceSubmit}
      >
        <form onSubmit={handleNewWorkspaceSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Workspace Name"
              name="workspace_name"
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace discription
            </Typography>
            <Textarea
              label="Discription"
              size="lg"
              name="workspace_discription"
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>
        </form>
      </Modal>
      {/*Modal for Workspace Assignment*/}
      <Modal
        open={taskDetailsOpen}
        onClose={handleTaskDetailsOpen}
        title="Task Details"
        confirmText="Submit"
        onConfirm={handleTaskDetailsSubmit}
      >
        <form onSubmit={handleTaskDetailsSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Workspace Name"
              name="workspace_name"
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace discription
            </Typography>
            <Textarea
              label="Discription"
              size="lg"
              name="workspace_discription"
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>

          <div className="flex mb-6 gap-4 justify-between">
            <div>
              <Button
                className="bg-delete1 flex items-center gap-3"
                size="m"
                onClick={handleWorkspaceOpen}
              >
                Delete Workspace
              </Button>{" "}
            </div>
            <div>
              <Checkbox id="ripple-on" label="Activate" ripple={true} />
            </div>
          </div>
        </form>
      </Modal>
      {/* Modal for Workspace Details */}
      <Modal
        open={taskDetailsOpen}
        onClose={handleTaskDetailsOpen}
        title="Task Details"
        confirmText="Submit"
        onConfirm={handleTaskDetailsSubmit}
      >
        <form onSubmit={handleTaskDetailsSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Workspace Name"
              name="workspace_name"
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace discription
            </Typography>
            <Textarea
              label="Discription"
              size="lg"
              name="workspace_discription"
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>

          <div className="flex mb-6 gap-4 justify-between">
            <div>
              <Button
                className="bg-delete1 flex items-center gap-3"
                size="m"
                onClick={handleWorkspaceOpen}
              >
                Delete Workspace
              </Button>{" "}
            </div>
            <div>
              <Checkbox id="ripple-on" label="Activate" ripple={true} />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Workspace;

// <div className="mb-6 flex gap-4">
//   <div className="flex-1">
//     <Typography variant="small" color="blue-gray" className="mb-2">
//       Assignee
//     </Typography>
//     <Select
//       size="lg"
//       name="assignee"
//       value={taskDetailsData.assignee}
//       onChange={(value) =>
//         setTaskDetailsData({ ...taskDetailsData, assignee: value })
//       }
//       required
//     >
//       <Option value="User1">User1</Option>
//       <Option value="User2">User2</Option>
//       <Option value="User3">User3</Option>
//     </Select>
//   </div>
//   <div className=" w-4/3">
//     <Typography variant="small" color="blue-gray" className="mb-2">
//       Assignee As
//     </Typography>
//     <Select
//       size="lg"
//       name="assignee"
//       value={taskDetailsData.assignee}
//       onChange={(value) =>
//         setTaskDetailsData({ ...taskDetailsData, assignee: value })
//       }
//       required
//     >
//       <Option value="User1">Admin</Option>
//       <Option value="User2">User</Option>
//     </Select>
//   </div>
// </div>;
