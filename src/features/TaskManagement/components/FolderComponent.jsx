import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Tooltip,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  FolderIcon,
  FolderPlusIcon,
  DocumentPlusIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

import TaskCard from "./TaskCard";
import Modal from "../../../components/Modal";
import {
  useCreateFolderMutation,
  useUpdateFolderByIdMutation,
  useCreateTaskMutation,
  useListTaskQuery,
} from "../apiSlice";
const FolderComponent = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [updateSpaceById] = useUpdateSpaceByIdMutation();

  const [folderDetailsOpen, setFolderDetailsOpen] = useState(false);
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);

  //////////////////////////////////////////////// folder
  const [updateFolderById] = useUpdateFolderByIdMutation();

  const [folderData, setFolderData] = useState({
    id: null,
    folder_name: "",
    folder_description: "",
    is_ative: true,
    is_archived: false,
    parent_folder: "",
    space_id: "",
  });

  useEffect(() => {
    if (folder) {
      setFolderData({
        id: folder.id,
        folder_name: folder.name,
        folder_description: folder.description,
        is_active: folder.is_active,
        is_archived: folder.is_archived,
        parent_folder: folder.parent_folder,
        space_id: folder.space,
      });
    }
  }, [folder]);

  const handleUpdateFolder = async () => {
    try {
      await updateFolderById({
        id: folderData.id,
        name: folderData.folder_name,
        description: folderData.folder_description,
        is_ative: folderData.is_ative,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update folder:", error);
    }
  };

  const handleDeletFolder = async (id) => {
    try {
      await updateFolderById({
        id: folderData.id,
        is_archived: !folderData.is_archived,
      }).unwrap();
    } catch (error) {
      console.error("Failed to Delet folder:", error);
    }
  };

  ///////////////////////////////////////// new neated folder

  const [CreateNestedFolder] = useCreateFolderMutation();

  const [newFolderData, setNewFolderData] = useState({
    nested_folder_name: "",
    nested_folder_description: "",
    nested_parent_folder: "",
    nested_spaceId: "",
  });

  useEffect(() => {
    if (folder?.id) {
      setNewFolderData((prevData) => ({
        ...prevData,
        nested_spaceId: folder.space,
        nested_parent_folder: folder.id,
      }));
    }
  }, [folder.id]);

  const handleAddNestedFolder = async (event) => {
    event.preventDefault();
    try {
      await CreateNestedFolder({
        name: newFolderData.nested_folder_name,
        description: newFolderData.nested_folder_description,
        parent_folder: newFolderData.nested_parent_folder,
        space: newFolderData.nested_spaceId,
      });
      handleNewFolderOpen();
    } catch (error) {
      console.error("Failed to Add nested folder:", error);
    }
  };

  /////////////////////////////////////////// Task

  const [createTask] = useCreateTaskMutation();

  const [newTaskData, setNewTaskData] = useState({
    new_task_name: "",
    new_task_description: "",
    new_task_folder: "",
  });

  useEffect(() => {
    if (folder?.id) {
      setNewTaskData((prevData) => ({
        ...prevData,
        new_task_folder: folder.id,
      }));
    }
  }, [folder.id]);

  const handleAddNewTask = async (event) => {
    event.preventDefault();
    try {
      await createTask({
        name: newTaskData.new_task_name,
        description: newTaskData.new_task_description,
        folder: newTaskData.new_task_folder,
      });
      handleNewTaskOpen();
    } catch (error) {
      console.error("Failed to Add New Task:", error);
    }
  };

  /////////////////////////////////////// handles

  const handleFolderDetailsOpen = () =>
    setFolderDetailsOpen(!folderDetailsOpen);

  const handleFolderChange = (event) => {
    const { name, value } = event.target;
    setFolderData({ ...folderData, [name]: value });
  };
  const handleNewFolderOpen = () => setNewFolderOpen(!newFolderOpen);

  const handleNewFolderChange = (event) => {
    const { name, value } = event.target;
    setNewFolderData({ ...newFolderData, [name]: value });
  };
  const handleNewTaskOpen = () => setNewTaskOpen(!newTaskOpen);
  const handleNewTaskChange = (event) => {
    const { name, value } = event.target;
    setNewTaskData({ ...newTaskData, [name]: value });
  };

  let taskData = [];
  let taskError = "";
  let taskIsLoading = false;

  if (folder?.id) {
    const queryResult = useListTaskQuery(folder.id);
    taskData = queryResult.data || [];
    taskError = queryResult.error || "";
    taskIsLoading = queryResult.isLoading;
  }
  return (
    <div className={`ml-${3 * 4}`}>
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
          <FolderIcon className="h-5 w-5 text-blue-500 mr-2" />
          <Typography variant="small">{folder.name}</Typography>
          <div className="ml-auto flex space-x-2 items-center">
            <Tooltip content="Edit Folder">
              <IconButton
                size="sm"
                color="blue"
                className="rounded-full"
                onClick={() => handleFolderDetailsOpen()}
              >
                <PencilIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content="Add nested folder">
              <IconButton
                size="lg"
                color="blue"
                variant="text"
                className="rounded-full"
                onClick={() => handleNewFolderOpen()}
              >
                <FolderPlusIcon className="h-8 w-8" />
              </IconButton>
            </Tooltip>
            <Tooltip content="Add task">
              <IconButton
                size="lg"
                color="blue"
                variant="text"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNewTaskOpen();
                }}
              >
                <DocumentPlusIcon className="h-8 w-8" />
              </IconButton>
            </Tooltip>
          </div>
        </AccordionHeader>
        <AccordionBody>
          {folder.subFolders.map((subFolder) => (
            <FolderComponent key={subFolder.id} folder={subFolder} />
          ))}
          {taskData?.map((task) => (
            <TaskCard tasks={task} />
          ))}
        </AccordionBody>
      </Accordion>
      {/*Modal for space Edit*/}
      <Modal
        open={folderDetailsOpen}
        onClose={handleFolderDetailsOpen}
        title="Edit Workspace"
        confirmText="Submit"
        onConfirm={handleUpdateFolder}
        showDelete={true}
        onConfirmDelete={() => handleDeletFolder(folderData.id)}
      >
        <form onSubmit={handleUpdateFolder}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Folder Name"
              name="folder_name"
              value={folderData.folder_name}
              onChange={handleFolderChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Workspace discription
            </Typography>
            <Textarea
              label="Folder Description"
              size="lg"
              className="h-44"
              name="folder_description"
              value={folderData.folder_description}
              onChange={handleFolderChange}
              required
            />
          </div>

          <div className="flex mb-6 gap-4 justify-between">
            <div>
              <Checkbox
                id="active-checkbox"
                label={folderData.is_ative ? "Active" : "Not Active"}
                name="is_ative"
                checked={folderData.is_ative}
                onChange={() =>
                  setFolderData({
                    ...folderData,
                    is_ative: !folderData.is_ative,
                  })
                }
                ripple={true}
              />
            </div>
          </div>
        </form>
      </Modal>
      {/*Modal for Nested Folder Adding*/}
      <Modal
        open={newFolderOpen}
        onClose={handleNewFolderOpen}
        title="Add New Folder"
        confirmText="Submit"
        onConfirm={handleAddNestedFolder}
      >
        <form onSubmit={handleAddNestedFolder}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              folder Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Folder Name"
              name="nested_folder_name"
              onChange={handleNewFolderChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              folde discription
            </Typography>
            <Textarea
              label="Folder Discription"
              size="lg"
              className="h-44"
              name="nested_folder_description"
              onChange={handleNewFolderChange}
              required
            />
          </div>
        </form>
      </Modal>
      {/* *Modal for Adding Task */}
      <Modal
        open={newTaskOpen}
        onClose={handleNewTaskOpen}
        title="Add New Task"
        confirmText="Submit"
        onConfirm={handleAddNewTask}
      >
        <form onSubmit={handleAddNewTask}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Task Name
            </Typography>
            <Input
              size="lg"
              label="Name"
              placeholder="Enter Task Name"
              name="new_task_name"
              onChange={handleNewTaskChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Task discription
            </Typography>
            <Textarea
              label="Task Discription"
              size="lg"
              className="h-44"
              name="new_task_description"
              onChange={handleNewTaskChange}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FolderComponent;
