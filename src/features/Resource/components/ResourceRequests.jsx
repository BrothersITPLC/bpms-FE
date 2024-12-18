import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useGetResourceIApproveQuery } from "../resourceApi";
import { formatFriendlyDate } from "../../../../helpers/formatingDateUserFreindly";

const TABS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Denied", value: "denied" },
];

const TABLE_HEAD = [
  "Requester",
  "Resource",
  "Description",
  "Quantity",
  "Request Date",
  "Due Date",
  "Status",
  "",
];

const ResourceRequestHistory = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [search, setSearch] = useState("");
  const { data: resources } = useGetResourceIApproveQuery(search);
  // Filter TABLE_ROWS based on selected tab

  // Check if selectedTab is updating correctly
  console.log("Selected Tab:", selectedTab);

  return (
    <Card className="flex-1 ml-64 p-6">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Resource Requests
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See all resource requests and their statuses
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              Export this table
            </Button>
          </div>
        </div>
        {/* Simplified Tabs without TabsHeader */}
        <div className="flex w-full md:w-max">
          {TABS.map(({ label, value }) => (
            <Button
              key={value}
              variant={selectedTab === value ? "filled" : "text"}
              onClick={() => setSelectedTab(value)} // Update selectedTab on click
              className="px-4"
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="w-full md:w-72 mt-4">
          <Input
            label="Search Requests"
            value={search}
            onChange={(e) => setSearch(e.target?.value)}
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
            {resources?.map((resource, index) => {
              const isLast = index === resources?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={resource?.id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      {/* <Avatar src={img} alt={requester} size="sm" /> */}
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {resource?.requester_name?.username}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {resource?.requester_name?.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
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
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {resource?.request_description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {resource?.quantity}
                    </Typography>
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
                      {resource?.due_date}
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
                    <Tooltip content="Edit Request">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
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
    </Card>
  );
};

export default ResourceRequestHistory;
