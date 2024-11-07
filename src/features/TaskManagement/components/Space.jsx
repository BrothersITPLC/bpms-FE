import React, { useState } from "react";
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
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
} from "@material-tailwind/react";
import Sidebar from "../../../components/Sidebar";
import Modal from "../../../components/Modal";

const TABLE_HEAD = [
  {
    head: "space ID",
    icon: <Checkbox />,
  },
  {
    head: "space Name",
  },
];

const TABLE_ROWS = [
  {
    space_id: "T-5",
    space_name: "Quantum Computing Research",
  },
  {
    space_id: "T-6",
    space_name: "5G Network Development",
  },
  {
    space_id: "T-7",
    space_name: "Robotic Process Automation",
  },
  {
    space_id: "T-8",
    space_name: "Artificial Intelligence Ethics",
  },
  {
    space_id: "T-9",
    space_name: "Virtual Reality for Education",
  },
];

const spaces = () => {
  // Modal states for "Add space" and PlusCircleIcon (space details)
  const [addspaceOpen, setAddspaceOpen] = useState(false);
  const [spaceDetailsOpen, setspaceDetailsOpen] = useState(false);

  // Form states
  const [newspaceData, setNewspaceData] = useState({
    space_id: "",
    space_name: "",
  });
  const [spaceDetailsData, setspaceDetailsData] = useState({
    space_name: "",
    assignee: "",
    due_date: "",
  });

  // Toggle modals
  const handleAddspaceOpen = () => setAddspaceOpen(!addspaceOpen);
  const handlespaceDetailsOpen = () => setspaceDetailsOpen(!spaceDetailsOpen);

  // Handle input changes for "Add space" form
  const handleNewspaceChange = (event) => {
    const { name, value } = event.target;
    setNewspaceData({ ...newspaceData, [name]: value });
  };

  // Handle input changes for space details modal
  const handlespaceDetailsChange = (event) => {
    const { name, value } = event.target;
    setspaceDetailsData({ ...spaceDetailsData, [name]: value });
  };

  // Handle "Add space" form submission
  const handleNewspaceSubmit = (event) => {
    event.preventDefault();
    console.log("New space Added:", newspaceData);
    handleAddspaceOpen(); // Close modal after submission
  };

  // Handle PlusCircleIcon click and populate space details modal
  const handleIconClick = (spaceName) => {
    setspaceDetailsData({ ...spaceDetailsData, space_name: spaceName });
    handlespaceDetailsOpen(); // Open the space details modal
  };

  // Handle space details form submission
  const handlespaceDetailsSubmit = (event) => {
    event.preventDefault();
    console.log("space Details Submitted:", spaceDetailsData);
    handlespaceDetailsOpen(); // Close modal after submission
  };

  return (
    <>
      <Card className="h-full w-fit flex-1">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="flex justify-between">
            <div className="w-fit">
              <Input
                label="Search space"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* Button to open "Add space" modal */}
            <Button
              className="bg-primary1 flex items-center gap-3"
              size="sm"
              onClick={handleAddspaceOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add space
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
            {TABLE_ROWS.map(({ space_id, space_name }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

              return (
                <tr key={space_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-1">
                      <Checkbox />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {space_id}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {space_name}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="flex items-center gap-2">
                      {/* Icon button to open space details modal */}
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => handleIconClick(space_name)}
                      >
                        <PlusCircleIcon
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

      {/* Modal for Adding a space */}
      <Modal
        open={addspaceOpen}
        onClose={handleAddspaceOpen}
        title="Add New space"
        confirmText="Submit"
        onConfirm={handleNewspaceSubmit}
      >
        <form onSubmit={handleNewspaceSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              space ID
            </Typography>
            <Input
              size="lg"
              placeholder="Enter space ID"
              name="space_id"
              onChange={handleNewspaceChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              space Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter space Name"
              name="space_name"
              onChange={handleNewspaceChange}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Modal for space Details */}
      <Modal
        open={spaceDetailsOpen}
        onClose={handlespaceDetailsOpen}
        title="space Details"
        confirmText="Submit"
        onConfirm={handlespaceDetailsSubmit}
      >
        <form onSubmit={handlespaceDetailsSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              space Name
            </Typography>
            <Input
              size="lg"
              name="space_name"
              value={spaceDetailsData.space_name} // Pre-populate space name
              readOnly
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Assignee
            </Typography>
            <Select
              size="lg"
              name="assignee"
              value={spaceDetailsData.assignee}
              onChange={(value) =>
                setspaceDetailsData({ ...spaceDetailsData, assignee: value })
              }
              required
            >
              <Option value="User1">User1</Option>
              <Option value="User2">User2</Option>
              <Option value="User3">User3</Option>
            </Select>
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Due Date
            </Typography>
            <Input
              size="lg"
              type="date"
              name="due_date"
              onChange={handlespaceDetailsChange}
              required
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default spaces;
