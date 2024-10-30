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
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";

const TABLE_HEAD = [
  {
    head: "Space ID",
    icon: <Checkbox />,
  },
  {
    head: "Space Name",
  },
];

const TABLE_ROWS = [
  {
    space_id: "S-1",
    space_name: "Development Space",
  },
  {
    space_id: "S-2",
    space_name: "Design Space",
  },
  {
    space_id: "S-3",
    space_name: "Testing Space",
  },
  {
    space_id: "S-4",
    space_name: "Deployment Space",
  },
];

const Space = () => {
  // Modal states for "Add Space" and space details
  const [addSpaceOpen, setAddSpaceOpen] = useState(false);
  const [spaceDetailsOpen, setSpaceDetailsOpen] = useState(false);

  // Form states
  const [newSpaceData, setNewSpaceData] = useState({
    space_id: "",
    space_name: "",
  });
  const [spaceDetailsData, setSpaceDetailsData] = useState({
    space_name: "",
  });

  // Toggle modals
  const handleAddSpaceOpen = () => setAddSpaceOpen(!addSpaceOpen);
  const handleSpaceDetailsOpen = () => setSpaceDetailsOpen(!spaceDetailsOpen);

  // Handle input changes for "Add Space" form
  const handleNewSpaceChange = (event) => {
    const { name, value } = event.target;
    setNewSpaceData({ ...newSpaceData, [name]: value });
  };

  // Handle input changes for space details modal
  const handleSpaceDetailsChange = (event) => {
    const { name, value } = event.target;
    setSpaceDetailsData({ ...spaceDetailsData, [name]: value });
  };

  // Handle "Add Space" form submission
  const handleNewSpaceSubmit = (event) => {
    event.preventDefault();
    console.log("New Space Added:", newSpaceData);
    handleAddSpaceOpen(); // Close modal after submission
  };

  // Handle icon click and populate space details modal
  const handleIconClick = (spaceName) => {
    setSpaceDetailsData({ space_name: spaceName });
    handleSpaceDetailsOpen(); // Open the space details modal
  };

  // Handle space details form submission
  const handleSpaceDetailsSubmit = (event) => {
    event.preventDefault();
    console.log("Space Details Submitted:", spaceDetailsData);
    handleSpaceDetailsOpen(); // Close modal after submission
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
                label="Search Space"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* Button to open "Add Space" modal */}
            <Button
              className="bg-primary1 flex items-center gap-3"
              size="sm"
              onClick={handleAddSpaceOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Space
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

      {/* Modal for Adding a Space */}
      <Modal
        open={addSpaceOpen}
        onClose={handleAddSpaceOpen}
        title="Add New Space"
        confirmText="Submit"
        onConfirm={handleNewSpaceSubmit}
      >
        <form onSubmit={handleNewSpaceSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Space ID
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Space ID"
              name="space_id"
              onChange={handleNewSpaceChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Space Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Space Name"
              name="space_name"
              onChange={handleNewSpaceChange}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Modal for Space Details */}
      <Modal
        open={spaceDetailsOpen}
        onClose={handleSpaceDetailsOpen}
        title="Space Details"
        confirmText="Submit"
        onConfirm={handleSpaceDetailsSubmit}
      >
        <form onSubmit={handleSpaceDetailsSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Space Name
            </Typography>
            <Input
              size="lg"
              name="space_name"
              value={spaceDetailsData.space_name} // Pre-populate space name
              readOnly
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Space;
