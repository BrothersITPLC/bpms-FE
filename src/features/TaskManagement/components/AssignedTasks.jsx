import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
  Select,
  IconButton,
  Option,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import DatePicker from "../../../components/DatePicker";

const TABS = [
  { label: "All", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
];

const TABLE_HEAD = [
  "Task Name",
  "Assignee",
  "Function",
  "Status",
  "Due Date",
  "",
];

const TABLE_ROWS = [
  {
    task: "Technical Document preparation",
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    job: "Manager",
    org: "Organization",
    completed: true,
    date: "23/04/18",
  },
  {
    task: "Financial Document preparation",
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    job: "Programator",
    org: "Developer",
    completed: false,
    date: "23/04/18",
  },
  {
    task: "Bid bond preparation",
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    job: "Executive",
    org: "Projects",
    completed: false,
    date: "19/09/17",
  },
  {
    task: "Technical Document preparation",
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    job: "Programator",
    org: "Developer",
    completed: true,
    date: "24/12/08",
  },
  {
    task: "Technical Document preparation",
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    job: "Manager",
    org: "Executive",
    completed: false,
    date: "04/10/21",
  },
];

const AssignedTasks = () => {
  const [open, setOpen] = useState(false); // Modal state
  const [selectedTab, setSelectedTab] = useState("all"); // State for selected tab
  const [taskName, setTaskName] = useState(""); // State for task name
  const [assignee, setAssignee] = useState(""); // State for assignee

  // Handle modal open/close
  const handleOpen = () => setOpen(!open);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Assigned Task:", { taskName, assignee });
    handleOpen(); // Close modal after submission
  };

  // Handle input changes for dropdowns
  const handleChange = (name, value) => {
    if (name === "taskName") setTaskName(value);
    if (name === "assignee") setAssignee(value);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    // Update form state for the date picker
  };

  // Filter tasks based on the selected tab
  const filteredTasks = TABLE_ROWS.filter((task) => {
    if (selectedTab === "ongoing") return !task.completed;
    if (selectedTab === "completed") return task.completed;
    return true; // "all" tab
  });

  return (
    <>
      <div className="flex-1">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Tasks list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all tasks
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3 bg-primary1"
                  size="sm"
                  onClick={handleOpen}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Assign
                  task
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs
                value={selectedTab}
                onChange={(value) => setSelectedTab(value)}
                className="w-full md:w-max"
              >
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(
                  ({ task, img, name, job, org, completed, date }, index) => {
                    const isLast = index === filteredTasks.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {task}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={img} alt={name} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {job}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {org}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={completed ? "completed" : "ongoing"}
                              color={completed ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Modal for Task Assignment */}
        <Modal
          open={open}
          onClose={handleOpen}
          title="Assign New Task"
          confirmText="Submit"
          onConfirm={handleSubmit}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Typography variant="small" color="blue-gray" className="mb-2">
                Task Name
              </Typography>
              <Select
                value={taskName}
                onChange={(value) => handleChange("taskName", value)}
                required
              >
                <Option value="Technical Document Preparation">
                  Technical Document Preparation
                </Option>
                <Option value="Financial Document Preparation">
                  Financial Document Preparation
                </Option>
                <Option value="Bid Bond Preparation">
                  Bid Bond Preparation
                </Option>
                <Option value="Technical Implementation">
                  Technical Implementation
                </Option>
              </Select>
            </div>
            <div className="mb-6">
              <Typography variant="small" color="blue-gray" className="mb-2">
                Assignee
              </Typography>
              <Select
                value={assignee}
                onChange={(value) => handleChange("assignee", value)}
                required
              >
                <Option value="User1">User1</Option>
                <Option value="User2">User2</Option>
              </Select>
            </div>
            <div className="mb-6">
              <Typography variant="small" color="blue-gray" className="mb-2">
                Due Date
              </Typography>
              <DatePicker
                field={{
                  label: "Due Date",
                  name: "dueDate",
                  placeholder: "YYYY-MM-DD",
                }}
                onChange={handleDateChange}
              />
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default AssignedTasks;
