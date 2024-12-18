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
import { useGetEmployeeQuery } from "../../UserManagement/userAPI";
import { useAddResourceMutation, useGetResourceQuery } from "../resourceApi";
import { toast } from "react-toastify";
import { formatFriendlyDate } from "../../../../helpers/formatingDateUserFreindly";

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

  const [formData, setFormData] = useState({
    requestName: "",
    requestDescription: "",
    due_date: "",
    approver: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { data: users } = useGetEmployeeQuery();
  const [addRequest] = useAddResourceMutation();
  const { data: RequestResource } = useGetResourceQuery();
  const currentUser = "Alice Johnson";

  // Filter rows based on selected tab and current user
  const filteredRows = TABLE_ROWS.filter((row) => {
    const isUserMatch = row.user === currentUser;
    const isStatusMatch =
      selectedTab === "all" || row.status.toLowerCase() === selectedTab;
    return isUserMatch && isStatusMatch;
  });

  const handleRequestResourceClick = () => setIsModalOpen(true);

  const handleConfirmRequest = async () => {
    try {
      await addRequest({
        request_name: formData.requestName,
        description: formData.requestDescription,
        approver: formData.approver,
        quantity: formData?.quantity,
        due_date: formData?.due_date,
      }).unwrap();

      toast.success("add successfully");
    } catch (error) {
      toast.error("error Please try Again!");
    }
  };

  return (
    <Card className="flex-1 ml-64 p-6">
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
            {RequestResource?.map((resource, index) => {
              const isLast = index === filteredRows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={resource?.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {resource?.request_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={resource?.latest_status?.status || "Pending"}
                      color={
                        resource?.latest_status?.status === "Approved"
                          ? "green"
                          : resource?.latest_status?.status === "Pending" ||
                            resource?.latest_status?.status == null
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
                      {formatFriendlyDate(resource?.created_at)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {resource?.due_date} {/* Display the Due Date */}
                    </Typography>
                  </td>
                </tr>
              );
            })}
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
        size="md"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request a Resource"
        confirmText="Submit Request"
        onConfirm={handleConfirmRequest}
      >
        <div className=" mx-auto p-6 border rounded ">
          <h2 className="text-2xl font-semibold mb-4">
            Create Resource Request
          </h2>

          <div className="mb-4">
            <label
              htmlFor="requestName"
              className="block text-sm font-medium text-gray-700"
            >
              Request Name
            </label>
            <input
              type="text"
              id="requestName"
              name="requestName"
              value={formData.requestName}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-primary1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="requestDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Request Description
            </label>
            <textarea
              id="requestDescription"
              name="requestDescription"
              value={formData.requestDescription}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-primary1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary1"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="due_date"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>

            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-primary1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="approver"
              className="block text-sm font-medium text-gray-700"
            >
              Approver
            </label>
            <select
              id="approver"
              name="approver"
              value={formData.approver}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-primary1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary1"
            >
              <option value="">Select Approver</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
              className="mt-1 p-2 w-full border border-primary1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary1"
            />
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default ResourceRequestHistory;
