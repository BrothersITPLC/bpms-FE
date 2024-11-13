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
  Tab,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

const TABS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Denied", value: "denied" },
];

const TABLE_HEAD = ["Requester", "Resource", "Request Date", "Status", ""];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    requester: "Seblewongel Hailu",
    email: "seblewongelhailu@brothersitplc.com",
    resource: "Laptop",
    requestDate: "2024-10-01",
    status: "Approved",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    requester: "Fasika Getachew",
    email: "fasikagetachew@brothersitplc.com",
    resource: "Projector",
    requestDate: "2024-10-02",
    status: "Pending",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    requester: "Firdos Fenta",
    email: "firdosfenta@brothersitplc.com",
    resource: "Conference Room",
    requestDate: "2024-10-03",
    status: "Denied",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    requester: "Kbruysfa Desalegn",
    email: "kbruysfadesalegn@brothersitplc.com",
    resource: "Paper",
    requestDate: "2024-09-23",
    status: "Approved",
  },
];

const ResourceRequestHistory = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  // Filter TABLE_ROWS based on selected tab
  const filteredRows = TABLE_ROWS.filter((row) => {
    if (selectedTab === "all") return true;
    return row.status.toLowerCase() === selectedTab;
  });

  // Check if selectedTab is updating correctly
  console.log("Selected Tab:", selectedTab);

  return (
    <Card className="flex-1 w-full">
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
              (
                { img, requester, email, resource, requestDate, status },
                index
              ) => {
                const isLast = index === filteredRows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={requester}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={requester} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {requester}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
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
                        {resource}
                      </Typography>
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
                      <Tooltip content="Edit Request">
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
