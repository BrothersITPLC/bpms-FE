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
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import {
  useListWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceByIdMutation,
} from "../apiSlice";

const TABLE_HEAD = [
  { head: "Workspace ID" },
  { head: "Workspace Name" },
  { head: "Workspace Description" },
];

const Workspace = () => {
  // RTK Query hooks for fetching and creating workspaces
  const countries = [
    { name: "Argentina" },
    { name: "Brazil" },
    { name: "Canada" },
    { name: "Denmark" },
    { name: "Egypt" },
    { name: "Finland" },
    { name: "Germany" },
    { name: "Hungary" },
    { name: "India" },
    { name: "Japan" },
  ];
  const { data: workspaces, error, isLoading } = useListWorkspacesQuery();
  const [createWorkspace] = useCreateWorkspaceMutation();
  const [updateWorkspaceById] = useUpdateWorkspaceByIdMutation();
  //asigne
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [newWorkspaceData, setNewWorkspaceData] = useState({
    id: null,
    workspace_name: "",
    workspace_description: "",
    is_ative: true,
    is_archived: false,
    workspace_id: "",
  });

  // Modal states for "Add Task" and PlusCircleIcon (task details)
  const [WorkspaceOpen, setWorkspaceOpen] = useState(false);
  const [WorkspacekDetailsOpen, setWorkspaceDetailsOpen] = useState(false);
  const [AsignWorkspacekMemberOpen, setAsignWorkspacekMemberOpen] =
    useState(false);
  // Handle input changes for "Add Task" form
  const handleNewWorkspaceChange = (event) => {
    const { name, value } = event.target;
    setNewWorkspaceData({ ...newWorkspaceData, [name]: value });
  };
  // Toggle modals
  const handleWorkspaceOpen = () => setWorkspaceOpen(!WorkspaceOpen);
  const handleWorkspacekDetailsOpen = () =>
    setWorkspaceDetailsOpen(!WorkspacekDetailsOpen);
  const handleWorkspaceMemberOpen = () =>
    setAsignWorkspacekMemberOpen(!AsignWorkspacekMemberOpen);

  // Handle "Add Workspace" form submission
  const handleNewWorkspaceSubmit = async (event) => {
    event.preventDefault();
    try {
      await createWorkspace({
        name: newWorkspaceData.workspace_name,
        description: newWorkspaceData.workspace_description,
      });
      handleWorkspaceOpen();
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };
  // Handle "Edit Workspace" form submission
  const handleUpdateWorkspace = async () => {
    try {
      await updateWorkspaceById({
        id: newWorkspaceData.id,
        name: newWorkspaceData.workspace_name,
        description: newWorkspaceData.workspace_description,
        is_ative: newWorkspaceData.is_ative,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update workspace:", error);
    }
  };
  // Handle "Delet Workspace" form submission
  const handleDeletWorkspace = async (id) => {
    try {
      await updateWorkspaceById({
        id: newWorkspaceData.id,
        is_archived: !newWorkspaceData.is_archived,
      }).unwrap();
    } catch (error) {
      console.error("Failed to Delet workspace:", error);
    }
  };
  // Handle PlusCircleIcon click and populate task details modal
  const handleEditIconClick = (workspace) => {
    setNewWorkspaceData({
      id: workspace.id,
      workspace_name: workspace.name,
      workspace_description: workspace.description,
      is_ative: workspace.is_ative,
      is_archived: workspace.is_archived,
      workspace_id: workspace.workspace_id,
    });
    handleWorkspacekDetailsOpen();
  };

  const handleAssignIconClick = () => {
    handleWorkspaceMemberOpen();
  };
  //asigne
  // Filter countries as the user types
  const handleInputChange = (event) => {
    const input = event.target.value;
    setQuery(input);

    // Filter country list based on input
    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCountries(results);
    setIsDropdownVisible(true); // Show dropdown when typing
  };

  // Show dropdown when the input is focused
  const handleInputFocus = () => {
    setFilteredCountries(countries); // Show all countries initially
    setIsDropdownVisible(true);
  };

  // Hide dropdown when a country is selected
  const selectCountry = (countryName) => {
    setQuery(countryName);
    setIsDropdownVisible(false);
  };

  return (
    <div className="flex w-full">
      {/* Table for Displaying a Workspace */}
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

        {isLoading ? (
          <p>Loading workspaces...</p>
        ) : error ? (
          <p>Error fetching workspaces.</p>
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head }) => (
                  <th key={head} className="border-b border-gray-300 p-4">
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workspaces.map((workspace) => (
                <tr key={workspace.id}>
                  <td className="p-4 border-b border-gray-300">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {workspace.workspace_id}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-gray-300">
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {workspace.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-gray-300">
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {workspace.description.length > 50
                        ? `${workspace.description.substring(0, 50)}...`
                        : workspace.description}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-gray-300 flex gap-16">
                    <IconButton
                      variant="text"
                      size="sm"
                      onClick={() => handleAssignIconClick()}
                    >
                      <UserIcon
                        strokeWidth={3}
                        className="h-4 w-4 text-gray-900"
                      />
                    </IconButton>
                    <IconButton
                      variant="text"
                      size="sm"
                      onClick={() => handleEditIconClick(workspace)}
                    >
                      <PencilSquareIcon
                        strokeWidth={3}
                        className="h-4 w-4 text-gray-900"
                      />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
              className="h-44"
              name="workspace_description"
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>
        </form>
      </Modal>
      {/*Modal for Workspace Edit*/}
      <Modal
        open={WorkspacekDetailsOpen}
        onClose={handleWorkspacekDetailsOpen}
        title="Edit Workspace"
        confirmText="Submit"
        onConfirm={handleUpdateWorkspace}
        showDelete={true}
        onConfirmDelete={() => handleDeletWorkspace(newWorkspaceData.id)}
      >
        <form onSubmit={handleUpdateWorkspace}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Workspace Name"
              name="workspace_name"
              value={newWorkspaceData.workspace_name}
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace discription
            </Typography>
            <Textarea
              label="Description"
              size="lg"
              className="h-44"
              name="workspace_description"
              value={newWorkspaceData.workspace_description}
              onChange={handleNewWorkspaceChange}
              required
            />
          </div>

          <div className="flex mb-6 gap-4 justify-between">
            <div>
              <Checkbox
                id="active-checkbox"
                label={newWorkspaceData.is_ative ? "Active" : "Not Active"}
                name="is_ative"
                checked={newWorkspaceData.is_ative}
                onChange={() =>
                  setNewWorkspaceData({
                    ...newWorkspaceData,
                    is_ative: !newWorkspaceData.is_ative,
                  })
                }
                ripple={true}
              />
            </div>
          </div>
        </form>
      </Modal>
      {/*Modal for Workspace Assignment*/}
      <Modal
        open={AsignWorkspacekMemberOpen}
        onClose={handleWorkspaceMemberOpen}
        title="Assigne a Member"
        confirmText="Submit"
        onConfirm={handleNewWorkspaceChange}
      >
        <div className="relative w-full max-w-xs mx-auto">
          {/* Input Field */}
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Type a country"
            className="py-3 px-4 w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
          />

          {/* Dropdown List */}
          {isDropdownVisible && (
            <div className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-y-auto">
              {filteredCountries.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                >
                  <span onClick={() => selectCountry(country.name)}>
                    {country.name}
                  </span>

                  {/* Icons */}
                  <div className="flex items-center space-x-2 gap-4">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleAddCountry(country.name)}
                    >
                      +
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveCountry(country.name)}
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Workspace;
