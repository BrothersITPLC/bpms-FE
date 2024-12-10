import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  FolderIcon,
  FolderPlusIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/solid";

import TaskComponent from "./TaskComponent";

const FolderComponent = ({ folder, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(folder);
  const handleAddNestedFolder = () => {
    console.log(`Adding nested folder to ${folder.name}`);
  };

  const handleAddTask = () => {
    console.log(`Adding task to ${folder.name}`);
  };

  return (
    <div className={`ml-${level * 4}`}>
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
          <div className="ml-auto flex space-x-2">
            <Tooltip content="Add nested folder">
              <IconButton
                size="sm"
                color="blue"
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddNestedFolder();
                }}
              >
                <FolderPlusIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content="Add task">
              <IconButton
                size="sm"
                color="blue"
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddTask();
                }}
              >
                <DocumentPlusIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        </AccordionHeader>
        {/* <AccordionBody>
          {folder.folders.map((subFolder) => (
            <FolderComponent
              key={subFolder.id}
              folder={subFolder}
              level={level + 1}
            />
          ))}
          {folder.tasks.map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
        </AccordionBody> */}
      </Accordion>
    </div>
  );
};

export default FolderComponent;
