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
    head: "folder ID",
    icon: <Checkbox />,
  },
  {
    head: "folder Name",
  },
];

const TABLE_ROWS = [
  {
    folder_id: "T-5",
    folder_name: "Artificial Intelligence in Healthcare",
  },
  {
    folder_id: "T-6",
    folder_name: "Blockchain for Secure Transactions",
  },
  {
    folder_id: "T-7",
    folder_name: "Cloud Computing Solutions",
  },
  {
    folder_id: "T-8",
    folder_name: "Cybersecurity Measures in IoT",
  },
  {
    folder_id: "T-9",
    folder_name: "Data Science and Machine Learning",
  },
];

const folders = () => {
  // Modal states for "Add folder" and PlusCircleIcon (folder details)
  const [addfolderOpen, setAddfolderOpen] = useState(false);
  const [folderDetailsOpen, setfolderDetailsOpen] = useState(false);

  // Form states
  const [newfolderData, setNewfolderData] = useState({
    folder_id: "",
    folder_name: "",
  });
  const [folderDetailsData, setfolderDetailsData] = useState({
    folder_name: "",
    assignee: "",
    due_date: "",
  });

  // Toggle modals
  const handleAddfolderOpen = () => setAddfolderOpen(!addfolderOpen);
  const handlefolderDetailsOpen = () =>
    setfolderDetailsOpen(!folderDetailsOpen);

  // Handle input changes for "Add folder" form
  const handleNewfolderChange = (event) => {
    const { name, value } = event.target;
    setNewfolderData({ ...newfolderData, [name]: value });
  };

  // Handle input changes for folder details modal
  const handlefolderDetailsChange = (event) => {
    const { name, value } = event.target;
    setfolderDetailsData({ ...folderDetailsData, [name]: value });
  };

  // Handle "Add folder" form submission
  const handleNewfolderSubmit = (event) => {
    event.preventDefault();
    console.log("New folder Added:", newfolderData);
    handleAddfolderOpen(); // Close modal after submission
  };

  // Handle PlusCircleIcon click and populate folder details modal
  const handleIconClick = (folderName) => {
    setfolderDetailsData({ ...folderDetailsData, folder_name: folderName });
    handlefolderDetailsOpen(); // Open the folder details modal
  };

  // Handle folder details form submission
  const handlefolderDetailsSubmit = (event) => {
    event.preventDefault();
    console.log("folder Details Submitted:", folderDetailsData);
    handlefolderDetailsOpen(); // Close modal after submission
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
                label="Search folder"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* Button to open "Add folder" modal */}
            <Button
              className="bg-primary1 flex items-center gap-3"
              size="sm"
              onClick={handleAddfolderOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add folder
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
            {TABLE_ROWS.map(({ folder_id, folder_name }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

              return (
                <tr key={folder_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-1">
                      <Checkbox />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {folder_id}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {folder_name}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="flex items-center gap-2">
                      {/* Icon button to open folder details modal */}
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => handleIconClick(folder_name)}
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

      {/* Modal for Adding a folder */}
      <Modal
        open={addfolderOpen}
        onClose={handleAddfolderOpen}
        title="Add New folder"
        confirmText="Submit"
        onConfirm={handleNewfolderSubmit}
      >
        <form onSubmit={handleNewfolderSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              folder ID
            </Typography>
            <Input
              size="lg"
              placeholder="Enter folder ID"
              name="folder_id"
              onChange={handleNewfolderChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              folder Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter folder Name"
              name="folder_name"
              onChange={handleNewfolderChange}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Modal for folder Details */}
      <Modal
        open={folderDetailsOpen}
        onClose={handlefolderDetailsOpen}
        title="folder Details"
        confirmText="Submit"
        onConfirm={handlefolderDetailsSubmit}
      >
        <form onSubmit={handlefolderDetailsSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              folder Name
            </Typography>
            <Input
              size="lg"
              name="folder_name"
              value={folderDetailsData.folder_name} // Pre-populate folder name
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
              value={folderDetailsData.assignee}
              onChange={(value) =>
                setfolderDetailsData({ ...folderDetailsData, assignee: value })
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
              onChange={handlefolderDetailsChange}
              required
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default folders;
