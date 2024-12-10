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
import Modal from "../../../components/Modal";
import {
  useListWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceByIdMutation,
  useLazyListWorkspacesNonWorkspacesMembersQuery,
  useCreateWorkspaceMemberMutation,
} from "../apiSlice";
import MultipleWorkspacesComponent from "./MultipleWorkspacesComponent";

const Workspace = () => {
  // RTK Query hooks for fetching and creating workspaces
  const { data: workspaces, error, isLoading } = useListWorkspacesQuery();
  const [createWorkspace] = useCreateWorkspaceMutation();
  const [updateWorkspaceById] = useUpdateWorkspaceByIdMutation();
  const [createWorkspaceMember] = useCreateWorkspaceMemberMutation();
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

  return (
    <div className="flex-1 ml-64 p-6">
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
    </div>
  );
};

export default Workspace;

//  {
//    isLoading ? (
//      <p>Loading workspaces...</p>
//    ) : error ? (
//      <p>Error fetching workspaces.</p>
//    ) : (
//      <table className="w-full min-w-max table-auto text-left">
//        <thead>
//          <tr>
//            {TABLE_HEAD.map(({ head }) => (
//              <th key={head} className="border-b border-gray-300 p-4">
//                <Typography
//                  color="blue-gray"
//                  variant="small"
//                  className="!font-bold"
//                >
//                  {head}
//                </Typography>
//              </th>
//            ))}
//          </tr>
//        </thead>
//        <tbody>
//          {workspaces.map((workspace) => (
//            <tr key={workspace.id}>
//              <Accordion open={open === 1}>
//                <AccordionHeader onClick={() => handleOpen(1)}>
//                  <td className="p-4 border-b border-gray-300">
//                    <Typography
//                      variant="small"
//                      color="blue-gray"
//                      className="font-bold"
//                    >
//                      {workspace.workspace_id}
//                    </Typography>
//                  </td>
//                  <td className="p-4 border-b border-gray-300">
//                    <Typography
//                      variant="small"
//                      className="font-normal text-gray-600"
//                    >
//                      {workspace.name}
//                    </Typography>
//                  </td>
//                  <td className="p-4 border-b border-gray-300">
//                    <Typography
//                      variant="small"
//                      className="font-normal text-gray-600"
//                    >
//                      {workspace.description.length > 50
//                        ? `${workspace.description.substring(0, 50)}...`
//                        : workspace.description}
//                    </Typography>
//                  </td>
//                  <td className="p-4 border-b border-gray-300 flex gap-16">
//                    <div>
//                      <Popover>
//                        <PopoverHandler
//                          onClick={(event) => {
//                            handleWorkspaceMemberRetrive(event, workspace.id);
//                          }}
//                        >
//                          <UserIcon
//                            strokeWidth={3}
//                            className="h-4 w-4 text-gray-900 cursor-pointer"
//                          />
//                        </PopoverHandler>
//                        <PopoverContent className="w-96">
//                          <div className="relative w-full max-w-xs mx-auto">
//                            <Input
//                              type="text"
//                              value={query}
//                              onChange={handleInputChange}
//                              onFocus={handleInputFocus}
//                              placeholder="Type a member's name"
//                              className="py-3 px-4 w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
//                            />

//                            {isDropdownVisible && (
//                              <div className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-y-auto">
//                                {workspacesMembers ? (
//                                  workspacesMembers.map((member) => (
//                                    <div
//                                      key={member.id}
//                                      className="flex items-center justify-between cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
//                                    >
//                                      <span>{member.first_name}</span>
//                                      <div className="flex items-center space-x-2 gap-4">
//                                        {member.type === "member" ? (
//                                          <button className="text-red-500 hover:text-red-700">
//                                            x
//                                          </button>
//                                        ) : (
//                                          <button
//                                            className="text-green-500 hover:text-green-700"
//                                            onClick={() =>
//                                              handleAddMember(
//                                                workspace.id,
//                                                member.id
//                                              )
//                                            }
//                                          >
//                                            +
//                                          </button>
//                                        )}
//                                      </div>
//                                    </div>
//                                  ))
//                                ) : (
//                                  <h1>no</h1>
//                                )}
//                              </div>
//                            )}
//                          </div>
//                        </PopoverContent>
//                      </Popover>
//                    </div>
//                    <div>
//                      <IconButton
//                        variant="text"
//                        size="sm"
//                        onClick={() => handleEditIconClick(workspace)}
//                      >
//                        <PencilSquareIcon
//                          strokeWidth={3}
//                          className="h-4 w-4 text-gray-900"
//                        />
//                      </IconButton>
//                    </div>
//                  </td>{" "}
//                </AccordionHeader>
//                <AccordionBody>
//                  We&apos;re not always in the position that we want to be at.
//                  We&apos;re constantly growing. We&apos;re constantly making
//                  mistakes. We&apos;re constantly trying to express ourselves and
//                  actualize our dreams.
//                </AccordionBody>
//              </Accordion>
//            </tr>
//          ))}
//        </tbody>
//      </table>
//    );
//  }
