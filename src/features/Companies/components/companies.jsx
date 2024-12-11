import React, { useState } from "react";
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  PencilIcon,
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
import {
  useAddCompanyMutation,
  useGetCompanyQuery,
  useDeleteBulkCompanyMutation,
  useUpdateCompanyMutation,
} from "../companyApi";

const TABLE_HEAD = [
  {
    head: "Select",
    icon: <Checkbox />,
    field: "select",
  },
  {
    head: "Company Name",
    field: "name",
  },
  {
    head: "Company Address",
    field: "address",
  },
  {
    head: "Action",
    field: "action",
  },
];

const Companies = () => {
  const [addCompanyOpen, setAddCompanyOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCompanyData, setNewCompanyData] = useState({
    name: "",
    address: "",
  });
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedCompanies, setSelectedCompanies] = useState(new Set());
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [updateCompany] = useUpdateCompanyMutation();
  const { data, isError, refetch } = useGetCompanyQuery({
    search,
    ordering: sortConfig,
  });
  const [addCompany] = useAddCompanyMutation();
  const [deleteBulk] = useDeleteBulkCompanyMutation();

  const handleAddCompanyOpen = () => setAddCompanyOpen(!addCompanyOpen);

  const handleNewCompanyChange = (event) => {
    const { name, value } = event.target;
    setNewCompanyData({ ...newCompanyData, [name]: value });
  };

  const handleNewCompanySubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      if (!selectedCompany)
        await addCompany({
          name: newCompanyData.name,
          address: newCompanyData.address,
        }).unwrap();
      else {
        await updateCompany({
          data: {
            name: newCompanyData.name,
            address: newCompanyData.address,
          },
          id: selectedCompany?.id,
        }).unwrap();
      }
      refetch();
      setLoading(false);
      handleAddCompanyOpen();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectCompany = (companyId) => {
    const newSelected = new Set(selectedCompanies);
    if (newSelected.has(companyId)) {
      newSelected.delete(companyId);
    } else {
      newSelected.add(companyId);
    }
    setSelectedCompanies(newSelected);
  };

  const handleSelectAllCompanies = () => {
    if (selectedCompanies.size === data?.length) {
      setSelectedCompanies(new Set()); // Deselect all
    } else {
      const allCompanyIds = new Set(data?.map(({ id }) => id)); // Select all
      setSelectedCompanies(allCompanyIds);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCompanies.size === 0) {
      alert("No companies selected for deletion.");
      return;
    }

    const idsToDelete = Array.from(selectedCompanies);
    try {
      await deleteBulk({ ids: idsToDelete }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete companies:", error);
    }
  };

  return (
    <div className="flex-1 ml-64 p-6">
      <Card className="h-full w-full shadow-md rounded-lg overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-4 "
        >
          <div className="flex justify-between flex-col-reverse gap-6 items-center">
            <Input
              label="Search Company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />}
              className="w-1/3"
            />
            <div className="flex gap-2 w-full justify-end">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                size="sm"
                disabled={selectedCompanies?.size <= 0}
                onClick={handleBulkDelete}
              >
                <TrashIcon className="h-5 w-5" /> Delete Selected
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                size="sm"
                onClick={() => {
                  handleAddCompanyOpen();
                  setSelectedCompany(null);
                }}
              >
                <PlusCircleIcon className="h-5 w-5" /> Add Company
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-200">
              <tr>
                {TABLE_HEAD.map(({ head, icon, field }) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 p-4 cursor-pointer"
                    onClick={() => field !== "select" && handleSort(field)}
                  >
                    <div className="flex items-center gap-1">
                      {field === "select" ? (
                        <Checkbox
                          checked={selectedCompanies.size === data?.length}
                          onChange={handleSelectAllCompanies}
                        />
                      ) : (
                        icon
                      )}
                      <Typography
                        color="blue-gray"
                        variant="small"
                        className="!font-bold"
                      >
                        {head}
                      </Typography>
                      {sortConfig.key === field ? (
                        <span>
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(({ name, address, id }, index) => {
                const isSelected = selectedCompanies.has(id);
                const isLast = index === data.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                return (
                  <tr
                    key={id}
                    className={isSelected ? "bg-gray-200 w-full " : "w-full"}
                  >
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectCompany(id)}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {address}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        <PencilIcon
                          className="w-10 h-8 text-blue-800"
                          onClick={() => {
                            setSelectedCompany({ name, address, id });
                            setNewCompanyData({ name, address });
                            handleAddCompanyOpen();
                          }}
                        />
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={addCompanyOpen}
        onClose={handleAddCompanyOpen}
        title={selectedCompany ? "Edit Company" : "Add New Company"}
        confirmText="Submit"
        onConfirm={handleNewCompanySubmit}
      >
        <form onSubmit={handleNewCompanySubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Company Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Company Name"
              name="name"
              value={newCompanyData?.name || ""}
              onChange={handleNewCompanyChange}
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Company Address
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Company Address"
              name="address"
              value={newCompanyData?.address || ""}
              onChange={handleNewCompanyChange}
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Companies;
