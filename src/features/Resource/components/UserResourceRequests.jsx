import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal"; // Ensure Modal is imported correctly
import DatePicker from "../../../components/DatePicker"; // Ensure DatePicker is imported correctly

// Tab values
const TABS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Denied", value: "denied" },
];

// Table headers (with Status as the second column)
const TABLE_HEAD = ["Resource", "Status", "Request Date", "Due Date"];

// Sample request data with added due date
const TABLE_ROWS = [
  {
    user: "Alice Johnson",
    requester: "Alice Johnson",
    email: "alice@creative-tim.com",
    resource: "Laptop",
    requestDate: "2024-10-01",
    dueDate: "2024-10-10", // Added due date
    status: "Approved",
  },
  {
    user: "Alice Johnson",
    requester: "Alice Johnson",
    email: "alice@creative-tim.com",
    resource: "Projector",
    requestDate: "2024-10-02",
    dueDate: "2024-10-15", // Added due date
    status: "Pending",
  },
  {
    user: "Bob Smith",
    requester: "Bob Smith",
    email: "bob@creative-tim.com",
    resource: "Conference Room",
    requestDate: "2024-10-03",
    dueDate: "2024-10-20", // Added due date
    status: "Denied",
  },
  {
    user: "Alice Johnson",
    requester: "Alice Johnson",
    email: "alice@creative-tim.com",
    resource: "Paper",
    requestDate: "2024-09-23",
    dueDate: "2024-09-30", // Added due date
    status: "Approved",
  },
];

const ResourceRequestHistory = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState(""); // Field for the new resource name
  const [dueDate, setDueDate] = useState(""); // Field for the due date

  // Assuming "Alice Johnson" is the logged-in user
  const currentUser = "Alice Johnson";

  // Filter rows based on selected tab and current user
  const filteredRows = TABLE_ROWS.filter((row) => {
    const isUserMatch = row.user === currentUser;
    const isStatusMatch =
      selectedTab === "all" || row.status.toLowerCase() === selectedTab;
    return isUserMatch && isStatusMatch;
  });

  const handleRequestResourceClick = () => setIsModalOpen(true);

  const handleConfirmRequest = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    const newRequest = {
      user: currentUser,
      requester: currentUser,
      email: `${currentUser.toLowerCase().replace(" ", ".")}@example.com`,
      resource: newResource,
      requestDate: currentDate, // Set request date to current date
      dueDate: dueDate, // Include due date
      status: "Pending", // Default status
    };

    // Assuming TABLE_ROWS is mutable, push newRequest into it
    TABLE_ROWS.push(newRequest);

    console.log("New resource requested:", newRequest);
    setIsModalOpen(false);
    setNewResource("");
    setDueDate(""); // Reset due date
  };

  return (
    <Card className="flex-1 w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              {`${currentUser}'s Resource Requests`}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              View all resource requests you have made and their statuses.
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              variant="outlined"
              size="sm"
              onClick={handleRequestResourceClick}
            >
              Request a Resource
            </Button>
          </div>
        </div>
        {/* Simplified Tabs for filtering */}
        <div className="flex w-full md:w-max">
          {TABS.map(({ label, value }) => (
            <Button
              key={value}
              variant={selectedTab === value ? "filled" : "text"}
              onClick={() => setSelectedTab(value)}
              className="px-4"
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="w-full md:w-72 mt-4">
          <Input
            label="Search Requests"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
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
            {filteredRows.map(
              ({ resource, requestDate, dueDate, status }, index) => {
                const isLast = index === filteredRows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={`${resource}-${requestDate}`}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {resource}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={status}
                        color={
                          status === "Approved"
                            ? "green"
                            : status === "Pending"
                            ? "yellow"
                            : "red"
                        }
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {requestDate}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {dueDate} {/* Display the Due Date */}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
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

      {/* Modal for Requesting a Resource */}
      <Modal
        size="xs"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request a Resource"
        confirmText="Submit Request"
        onConfirm={handleConfirmRequest}
      >
        <div className="flex flex-col gap-4">
          <div>
            <Select label="Select Resource">
              <Option>Cash</Option>
              <Option>Paper</Option>
              <Option>Tools</Option>
              <Option>Human resource</Option>
            </Select>
          </div>
          <DatePicker
            field={{ label: "Due Date", name: "dueDate" }} // New DatePicker for due date
            onChange={(e) => setDueDate(e.target.value)} // Update due date on change
          />
        </div>
      </Modal>
    </Card>
  );
};

export default ResourceRequestHistory;
