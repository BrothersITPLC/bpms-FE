import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Tooltip,
  IconButton,
  Textarea,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";

import {
  ChevronDownIcon,
  PlusIcon,
  FolderPlusIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  useUpdateSpaceByIdMutation,
  useCreateFolderMutation,
  useListFolderQuery,
} from "../apiSlice";
import FolderComponent from "./FolderComponent";
const SpaceComponent = ({ space }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateSpaceById] = useUpdateSpaceByIdMutation();

  const [newSpaceData, setNewSpaceData] = useState({
    id: null,
    space_name: "",
    space_description: "",
    is_ative: true,
    is_archived: false,
    space_id: "",
  });
  const handleNewSpaceChange = (event) => {
    const { name, value } = event.target;
    setNewSpaceData({ ...newSpaceData, [name]: value });
  };
  const [spaceDetailsOpen, setSpaceDetailsOpen] = useState(false);

  const handlespaceDetailsOpen = () => setSpaceDetailsOpen(!spaceDetailsOpen);

  const handleUpdateSpace = async () => {
    try {
      await updateSpaceById({
        id: newSpaceData.id,
        name: newSpaceData.space_name,
        description: newSpaceData.space_description,
        is_ative: newSpaceData.is_ative,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update space:", error);
    }
  };

  const handleDeletSpace = async (id) => {
    try {
      await updateSpaceById({
        id: newSpaceData.id,
        is_archived: !newSpaceData.is_archived,
      }).unwrap();
    } catch (error) {
      console.error("Failed to Delet space:", error);
    }
  };

  useEffect(() => {
    if (space) {
      setNewSpaceData({
        id: space.id,
        space_name: space.name,
        space_description: space.description,
        is_active: space.is_active,
        is_archived: space.is_archived,
        space_id: space.workspace_id,
      });
    }
  }, [space]);

  //Folder
  const [folderOpen, setFolderOpen] = useState(false);

  const handleFolderOpen = () => setFolderOpen(!folderOpen);

  const [CreateFolder] = useCreateFolderMutation();

  const [newFolderData, setNewFolderData] = useState({
    folder_name: "",
    folder_description: "",
    spaceId: "",
  });

  useEffect(() => {
    if (space?.id) {
      setNewFolderData((prevData) => ({
        ...prevData,
        spaceId: space.id,
      }));
    }
  }, [space?.id]);

  const handleNewFolderChange = (event) => {
    const { name, value } = event.target;
    setNewFolderData({ ...newFolderData, [name]: value });
  };

  const handleNewFolderSubmit = async (event) => {
    event.preventDefault();
    try {
      await CreateFolder({
        name: newFolderData.folder_name,
        description: newFolderData.folder_description,
        space: newFolderData.spaceId,
      });
      handleFolderOpen();
    } catch (error) {
      console.error("Failed to create space:", error);
    }
  };

  let folderData = [];
  let folderError = "";
  let folderIsLoading = false;

  if (space?.id) {
    const queryResult = useListFolderQuery(space.id);
    folderData = queryResult.data || [];
    folderError = queryResult.error || "";
    folderIsLoading = queryResult.isLoading;
  }
  return (
    <div className={`ml-4`}>
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
          className="py-2 flex items-center"
        >
          <Typography variant="small">{space?.name}</Typography>
          <div className="ml-auto flex space-x-2">
            <Tooltip content="Edit Space">
              <IconButton
                size="sm"
                color="blue"
                className="rounded-full"
                onClick={() => handlespaceDetailsOpen()}
              >
                <PencilIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>

            <Tooltip content="Add folder">
              <IconButton
                size="sm"
                color="blue"
                variant="text"
                className="rounded-full"
                onClick={(e) => {
                  handleFolderOpen();
                }}
              >
                <FolderPlusIcon className="h-8 w-8" />
              </IconButton>
            </Tooltip>
          </div>
        </AccordionHeader>

        {folderIsLoading ? (
          <p>Loading...</p>
        ) : folderData && folderData.length > 0 ? (
          <AccordionBody>
            {folderData.map((folder) => (
              <FolderComponent key={folder.id} folder={folder} />
            ))}
          </AccordionBody>
        ) : (
          ""
        )}
      </Accordion>

      {/*Modal for space Edit*/}
      <Modal
        open={spaceDetailsOpen}
        onClose={handlespaceDetailsOpen}
        title="Edit Space"
        confirmText="Submit"
        onConfirm={handleUpdateSpace}
        showDelete={true}
        onConfirmDelete={() => handleDeletSpace(newSpaceData.id)}
      >
        <form onSubmit={handleUpdateSpace}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Space Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Space Name"
              name="space_name"
              value={newSpaceData.space_name}
              onChange={handleNewSpaceChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Space discription
            </Typography>
            <Textarea
              label="Description"
              size="lg"
              className="h-44"
              name="space_description"
              value={newSpaceData.space_description}
              onChange={handleNewSpaceChange}
              required
            />
          </div>

          <div className="flex mb-6 gap-4 justify-between">
            <div>
              <Checkbox
                id="active-checkbox"
                label={newSpaceData.is_ative ? "Active" : "Not Active"}
                name="is_ative"
                checked={newSpaceData.is_ative}
                onChange={() =>
                  setNewSpaceData({
                    ...newSpaceData,
                    is_ative: !newSpaceData.is_ative,
                  })
                }
                ripple={true}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/*Modal for Folder Adding*/}
      <Modal
        open={folderOpen}
        onClose={handleFolderOpen}
        title="Add New Folder"
        confirmText="Submit"
        onConfirm={handleNewFolderSubmit}
      >
        <form onSubmit={handleNewFolderSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              space Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Folder Name"
              name="folder_name"
              onChange={handleNewFolderChange}
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
              name="folder_description"
              onChange={handleNewFolderChange}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SpaceComponent;
