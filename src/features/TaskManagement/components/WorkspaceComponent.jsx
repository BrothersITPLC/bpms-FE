import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Checkbox,
  Textarea,
  Tooltip,
} from "@material-tailwind/react";
import {
  PencilIcon,
  UserPlusIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import {
  useUpdateWorkspaceByIdMutation,
  useCreateSpaceMutation,
  useListSpaceQuery,
} from "../apiSlice";
import SpaceComponent from "./SpaceComponent";
import Modal from "../../../components/Modal";
const WorkspaceComponent = ({ workspace }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [updateWorkspaceById] = useUpdateWorkspaceByIdMutation();

  const [newWorkspaceData, setNewWorkspaceData] = useState({
    id: null,
    workspace_name: "",
    workspace_description: "",
    is_ative: true,
    is_archived: false,
    workspace_id: "",
  });
  const handleNewWorkspaceChange = (event) => {
    const { name, value } = event.target;
    setNewWorkspaceData({ ...newWorkspaceData, [name]: value });
  };
  const [WorkspacekDetailsOpen, setWorkspaceDetailsOpen] = useState(false);

  const handleWorkspacekDetailsOpen = () =>
    setWorkspaceDetailsOpen(!WorkspacekDetailsOpen);

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
  useEffect(() => {
    setNewWorkspaceData({
      id: workspace.id,
      workspace_name: workspace.name,
      workspace_description: workspace.description,
      is_active: workspace.is_active,
      is_archived: workspace.is_archived,
      workspace_id: workspace.workspace_id,
    });
  }, []);

  //space
  const [spaceOpen, setSpaceOpen] = useState(false);

  const handleSpaceOpen = () => setSpaceOpen(!spaceOpen);

  const [CreateSpace] = useCreateSpaceMutation();

  const handleNewSpaceChange = (event) => {
    const { name, value } = event.target;
    setNewSpaceData({ ...newSpaceData, [name]: value });
  };

  const [newSpaceData, setNewSpaceData] = useState({
    space_name: "",
    space_description: "",
    workspaceId: workspace.id,
  });

  const handleNewSpaceSubmit = async (event) => {
    event.preventDefault();
    try {
      await CreateSpace({
        name: newSpaceData.space_name,
        description: newSpaceData.space_description,
        workspace: newSpaceData.workspaceId,
      });
      handleSpaceOpen();
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  const {
    data: spacesData,
    error: spaceError,
    isLoading: spaceIsLoading,
  } = useListSpaceQuery(workspace.id);

  return (
    <div>
      <Card className="w-full max-w-[90%]  mb-4">
        <CardBody>
          <div className="flex items-center justify-between mb-2 gap-4">
            <Typography variant="h6">
              {workspace.name}
              <span className=" font-bold"> ({workspace.workspace_id})</span>
            </Typography>
            <div className="flex space-x-2">
              <Tooltip content="Edit Workspace">
                <IconButton
                  size="sm"
                  color="blue"
                  className="rounded-full"
                  onClick={() => handleWorkspacekDetailsOpen()}
                >
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Add Workspace Member">
                <IconButton size="sm" color="blue" className="rounded-full">
                  <UserPlusIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Add space">
                <IconButton
                  size="sm"
                  color="blue"
                  className="rounded-full"
                  onClick={() => handleSpaceOpen()}
                >
                  <PlusIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
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
              className="py-2"
            >
              <Typography variant="small">Spaces</Typography>
            </AccordionHeader>
            {spacesData ? (
              <AccordionBody>
                {spacesData.map((space) => (
                  <SpaceComponent key={space.id} space={space} />
                ))}
              </AccordionBody>
            ) : (
              "no work space"
            )}
          </Accordion>
        </CardBody>
      </Card>

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

      {/*Modal for Space Adding*/}
      <Modal
        open={spaceOpen}
        onClose={handleSpaceOpen}
        title="Add New Space"
        confirmText="Submit"
        onConfirm={handleNewSpaceSubmit}
      >
        <form onSubmit={handleNewSpaceSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              space Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Workspace Name"
              name="space_name"
              onChange={handleNewSpaceChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              space discription
            </Typography>
            <Textarea
              label="Discription"
              size="lg"
              className="h-44"
              name="space_description"
              onChange={handleNewSpaceChange}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WorkspaceComponent;
