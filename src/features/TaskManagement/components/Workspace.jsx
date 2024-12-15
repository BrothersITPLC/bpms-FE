import React, { useState } from "react";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  UserIcon,
  PlusIcon,
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
  Popover,
  PopoverHandler,
  PopoverContent,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  useListWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceByIdMutation,
  useLazyListWorkspacesNonWorkspacesMembersQuery,
  useCreateWorkspaceMemberMutation,
  useCreatePriorityMutation,
  useCreateStatusMutation,
} from "../apiSlice";
import MultipleWorkspacesComponent from "./MultipleWorkspacesComponent";
import Modal from "../../../components/Modal";

const Workspace = () => {
  // RTK Query hooks for fetching and creating workspaces
  const { data: workspaces, error, isLoading } = useListWorkspacesQuery();
  const [createWorkspace] = useCreateWorkspaceMutation();
  const [updateWorkspaceById] = useUpdateWorkspaceByIdMutation();
  const [createWorkspaceMember] = useCreateWorkspaceMemberMutation();
  const [createPriority] = useCreatePriorityMutation();
  const [createStatus] = useCreateStatusMutation();
  //asigne
  const [query, setQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

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
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

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
  //asigne
  const [
    triggerListWorkspacesNonWorkspacesMembers,
    {
      data: workspacesMembers = [],
      error: membersError,
      isLoading: isMembersLoading,
    },
  ] = useLazyListWorkspacesNonWorkspacesMembersQuery();
  // Retrieve members based on workspace ID
  const handleWorkspaceMemberRetrive = async (event, workspace_id) => {
    event.preventDefault();
    try {
      await triggerListWorkspacesNonWorkspacesMembers(workspace_id);
    } catch (error) {
      console.error("Failed to retrieve workspace members:", error);
    }
  };
  // Add members based on workspace ID
  const handleAddMember = async (workspaceId, memberId) => {
    try {
      const result = await createWorkspaceMember({
        workspaceId,
        memberId,
      }).unwrap();
      console.log("Member added successfully:", result);
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const handleInputFocus = () => setIsDropdownVisible(!isDropdownVisible);
  const handleInputChange = (e) => setQuery(e.target.value);

  //////////////////////////////priority and status
  const handlePriorityOpen = () => setPriorityOpen(!priorityOpen);
  const handleStateOpen = () => setStatusOpen(!statusOpen);
  const [newPriorityData, setNewPriorityData] = useState({
    priority_description: "",
    color_code: "",
    priority_name: "",
  });
  const [newStatusData, setNewStatusData] = useState({
    status_description: "",
    color_code: "",
    status_name: "",
  });
  const handleNewPriorityChange = (event) => {
    const { name, value } = event.target;
    setNewPriorityData({ ...newPriorityData, [name]: value });
  };
  const handleNewStatusChange = (event) => {
    const { name, value } = event.target;
    setNewStatusData({ ...newStatusData, [name]: value });
  };

  const handleNewPrioritySubmit = async (event) => {
    event.preventDefault();
    try {
      await createPriority({
        name: newPriorityData.priority_name,
        description: newPriorityData.priority_description,
        color_code: newPriorityData.color_code,
      });
      handlePriorityOpen();
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };
  const handlenewStatusSubmit = async (event) => {
    event.preventDefault();
    try {
      await createStatus({
        name: newStatusData.status_name,
        description: newStatusData.status_description,
        color_code: newStatusData.color_code,
      });
      handleStateOpen();
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };
  return (
    <div className="flex-1 w-full">
      {/* Table for Displaying a Workspace */}
      <Card className="h-full w-full ">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none "
        >
          <div className="flex w-full ">
            <div className="w-fit">
              <Input
                label="Search WorkSpace"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* Button to open "Add Task" modal */}
            <Button
              className="bg-primary1 flex items-center mx-auto"
              size="sm"
              onClick={handleWorkspaceOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Workspace
            </Button>
            <Button
              className="bg-primary1 flex items-center mx-auto"
              size="sm"
              onClick={handlePriorityOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Priority
            </Button>
            <Button
              className="bg-primary1 flex items-center mx-auto"
              size="sm"
              onClick={handleStateOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Status
            </Button>
          </div>
        </CardHeader>
        {isLoading ? (
          <p>Loading workspaces...</p>
        ) : error ? (
          <p>Error fetching workspaces.</p>
        ) : (
          <MultipleWorkspacesComponent workspaces={workspaces} />
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
      {/* Modal for Adding a Priority */}
      <Modal
        open={priorityOpen}
        onClose={handlePriorityOpen}
        title="Add New Priority"
        confirmText="Submit"
        onConfirm={handleNewPrioritySubmit}
      >
        <form onSubmit={handleNewPrioritySubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Priority Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Priority Name"
              name="priority_name"
              onChange={handleNewPriorityChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Color Code
            </Typography>
            <Input
              size="lg"
              label="color"
              placeholder="Enter Color Code (HEX-code)"
              name="color_code"
              onChange={handleNewPriorityChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Priority discription
            </Typography>
            <Textarea
              label="Discription"
              size="lg"
              className="h-44"
              name="priority_description"
              onChange={handleNewPriorityChange}
              required
            />
          </div>
        </form>
      </Modal>
      {/* Modal for Adding a Status */}
      <Modal
        open={statusOpen}
        onClose={handleStateOpen}
        title="Add New Status"
        confirmText="Submit"
        onConfirm={handlenewStatusSubmit}
      >
        <form onSubmit={handlenewStatusSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Status Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Status Name"
              name="status_name"
              onChange={handleNewStatusChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Color Code
            </Typography>
            <Input
              size="lg"
              label="color"
              placeholder="Enter Color Code (HEX-code)"
              name="color_code"
              onChange={handleNewStatusChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Status discription
            </Typography>
            <Textarea
              label="Discription"
              size="lg"
              className="h-44"
              name="status_description"
              onChange={handleNewStatusChange}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Workspace;
