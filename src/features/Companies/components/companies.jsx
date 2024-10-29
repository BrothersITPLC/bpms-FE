import React, { useState } from "react";
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Checkbox,
  CardHeader,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";

const TABLE_HEAD = [
  {
    head: "Company ID",
    icon: <Checkbox />,
  },
  {
    head: "Company Name",
  },
];

const TABLE_ROWS = [
  {
    company_id: "C-1",
    company_name: "Ethiotelecom",
  },
  {
    company_id: "C-2",
    company_name: "Information Network Security Agency ",
  },
  {
    company_id: "C-3",
    company_name: "Oromia Science and Technology Authority",
  },
  {
    company_id: "C-4",
    company_name: "NHY Trading",
  },
];

const Companies = () => {
  // Modal states for "Add company" and PlusCircleIcon (Company details)
  const [addCompanyOpen, setAddCompanyOpen] = useState(false);

  // Form states
  const [newCompanyData, setNewCompanyData] = useState({
    company_id: "",
    company_name: "",
  });

  // Toggle modals
  const handleAddCompanyOpen = () => setAddCompanyOpen(!addCompanyOpen);
  const handleCompanyDetailsOpen = () =>
    setCompanyDetailsOpen(!companyDetailsOpen);

  // Handle input changes for "Add company" form
  const handleNewCompanyChange = (event) => {
    const { name, value } = event.target;
    setNewCompanyData({ ...newCompanyData, [name]: value });
  };

  // Handle input changes for Company details modal
  const handleCompanyDetailsChange = (event) => {
    const { name, value } = event.target;
    setCompanyDetailsData({ ...companyDetailsData, [name]: value });
  };

  // Handle "Add company" form submission
  const handleNewCompanySubmit = (event) => {
    event.preventDefault();
    console.log("New Company Added:", newCompanyData);
    handleAddCompanyOpen(); // Close modal after submission
  };

  // Handle PlusCircleIcon click and populate Company details modal
  const handleIconClick = (companyName) => {
    setCompanyDetailsData({ ...companyDetailsData, company_name: companyName });
    handleCompanyDetailsOpen(); // Open the Company details modal
  };

  return (
    <div className="flex w-full">
      <Card className="h-full w-fit flex-1">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="flex justify-between">
            <div className="w-fit">
              <Input
                label="Search Company"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* Button to open "Add Company" modal */}
            <Button
              className="bg-primary1 flex items-center gap-3"
              size="sm"
              onClick={handleAddCompanyOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Company
            </Button>
          </div>
        </CardHeader>

        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(({ head, icon }) => (
                <th key={head} className="border-b border-gray-300 p-4">
                  <div className="flex items-center gap-1">
                    {icon}
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ company_id, company_name }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

              return (
                <tr key={company_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-1">
                      <Checkbox />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {company_id}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {company_name}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="flex items-center gap-2">
                      {/* Icon button to open company details modal */}
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => handleIconClick(company_name)}
                      >
                        <PlusCircleIcon
                          strokeWidth={3}
                          className="h-4 w-4 text-gray-900"
                        />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Modal for Adding a Company */}
      <Modal
        open={addCompanyOpen}
        onClose={handleAddCompanyOpen}
        title="Add New Company"
        confirmText="Submit"
        onConfirm={handleNewCompanySubmit}
      >
        <form onSubmit={handleNewCompanySubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Company ID
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Company ID"
              name="company_id"
              onChange={handleNewCompanyChange}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Company Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Company Name"
              name="company_name"
              onChange={handleNewCompanyChange}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Modal for Company Details */}
    </div>
  );
};

export default Companies;
