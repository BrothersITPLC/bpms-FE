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
import Modal from "../../../components/Modal";

const TABLE_HEAD = [
  {
    head: "Folder ID",
    icon: <Checkbox />,
  },
  {
    head: "Folder Name",
  },
];

const TABLE_ROWS = [
  {
    folder_id: "F-1",
    folder_name: "Project Documents",
  },
  {
    folder_id: "F-2",
    folder_name: "Design Assets",
  },
  {
    folder_id: "F-3",
    folder_name: "Client Proposals",
  },
  {
    folder_id: "F-4",
    folder_name: "Reports",
  },
];

const Folder = () => {
  // Modal states for "Add Folder" and folder details
  const [addFolderOpen, setAddFolderOpen] = useState(false);
  const [folderDetailsOpen, setFolderDetailsOpen] = useState(false);

  // Form states
  const [newFolderData, setNewFolderData] = useState({
    folder_id: "",
    folder_name: "",
  });
  const [folderDetailsData, setFolderDetailsData] = useState({
    folder_name: "",
  });

  // Toggle modals
  const handleAddFolderOpen = () => setAddFolderOpen(!addFolderOpen);
  const handleFolderDetailsOpen = () =>
    setFolderDetailsOpen(!folderDetailsOpen);

  // Handle input changes for "Add Folder" form
  const handleNewFolderChange = (event) => {
    const { name, value } = event.target;
    setNewFolderData({ ...newFolderData, [name]: value });
  };

  // Handle input changes for folder details modal
  const handleFolderDetailsChange = (event) => {
    const { name, value } = event.target;
    setFolderDetailsData({ ...folderDetailsData, [name]: value });
  };

  // Handle "Add Folder" form submission
  const handleNewFolderSubmit = (event) => {
    event.preventDefault();
    console.log("New Folder Added:", newFolderData);
    handleAddFolderOpen(); // Close modal after submission
  };

  // Handle PlusCircleIcon click and populate folder details modal
  const handleIconClick = (folderName) => {
    setFolderDetailsData({ folder_name: folderName });
    handleFolderDetailsOpen(); // Open the folder details modal
  };

  // Handle folder details form submission
  const handleFolderDetailsSubmit = (event) => {
    event.preventDefault();
    console.log("Folder Details Submitted:", folderDetailsData);
    handleFolderDetailsOpen(); // Close modal after submission
  };

  return (
    <div className="flex-1">
      <Card className="h-full w-full flex-1">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="flex justify-between">
            <div className="w-fit">
              <Input
                label="Search Folder"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* Button to open "Add Folder" modal */}
            <Button
              className="bg-primary1 flex items-center gap-3"
              size="sm"
              onClick={handleAddFolderOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Folder
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

      {/* Modal for Adding a Folder */}
      <Modal
        open={addFolderOpen}
        onClose={handleAddFolderOpen}
        title="Add New Folder"
        confirmText="Submit"
        onConfirm={handleNewFolderSubmit}
      >
        <form onSubmit={handleNewFolderSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Folder ID
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Folder ID"
              name="folder_id"
              onChange={handleNewFolderChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Folder Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Folder Name"
              name="folder_name"
              onChange={handleNewFolderChange}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Modal for Folder Details */}
      <Modal
        open={folderDetailsOpen}
        onClose={handleFolderDetailsOpen}
        title="Folder Details"
        confirmText="Submit"
        onConfirm={handleFolderDetailsSubmit}
      >
        <form onSubmit={handleFolderDetailsSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Folder Name
            </Typography>
            <Input
              size="lg"
              name="folder_name"
              value={folderDetailsData.folder_name} // Pre-populate folder name
              readOnly
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Folder;
