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
  useAddClientMutation,
  useGetClientQuery,
  useDeleteBulkClientMutation,
  useUpdateClientMutation,
} from "../clientApi";

const TABLE_HEAD = [
  {
    head: "Select",
    icon: <Checkbox />,
    field: "select",
  },
  {
    head: "Client Name",
    field: "name",
  },
  {
    head: "Client Address",
    field: "address",
  },
  {
    head: "Action",
    field: "action",
  },
];

const Clients = () => {
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: "",
    address: "",
  });
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedClients, setSelectedClients] = useState(new Set());
  const [selectedClient, setSelectedClient] = useState(null);
  const [updateClient] = useUpdateClientMutation();
  const { data, isError, refetch } = useGetClientQuery({
    search,
    ordering: sortConfig,
  });
  const [addClient] = useAddClientMutation();
  const [deleteBulk] = useDeleteBulkClientMutation();

  const handleAddClientOpen = () => setAddClientOpen(!addClientOpen);

  const handleNewClientChange = (event) => {
    const { name, value } = event.target;
    setNewClientData({ ...newClientData, [name]: value });
  };

  const handleNewClientSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      if (!selectedClient)
        await addClient({
          name: newClientData.name,
          address: newClientData.address,
        }).unwrap();
      else {
        await updateClient({
          data: {
            name: newClientData.name,
            address: newClientData.address,
          },
          id: selectedClient?.id,
        }).unwrap();
      }
      refetch();
      setLoading(false);
      handleAddClientOpen();
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

  const handleSelectClient = (clientId) => {
    const newSelected = new Set(selectedClients);
    if (newSelected.has(clientId)) {
      newSelected.delete(clientId);
    } else {
      newSelected.add(clientId);
    }
    setSelectedClients(newSelected);
  };

  const handleSelectAllClients = () => {
    if (selectedClients.size === data?.length) {
      setSelectedClients(new Set()); // Deselect all
    } else {
      const allClientIds = new Set(data?.map(({ id }) => id)); // Select all
      setSelectedClients(allClientIds);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedClients.size === 0) {
      alert("No Clients selected for deletion.");
      return;
    }

    const idsToDelete = Array.from(selectedClients);
    try {
      await deleteBulk({ ids: idsToDelete }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete Clients:", error);
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
              label="Search Client"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />}
              className="w-1/3"
            />
            <div className="flex gap-2 w-full justify-end">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                size="sm"
                disabled={selectedClients?.size <= 0}
                onClick={handleBulkDelete}
              >
                <TrashIcon className="h-5 w-5" /> Delete Selected
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                size="sm"
                onClick={() => {
                  handleAddClientOpen();
                  setSelectedClient(null);
                }}
              >
                <PlusCircleIcon className="h-5 w-5" /> Add Client
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
                          checked={selectedClients.size === data?.length}
                          onChange={handleSelectAllClients}
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
                const isSelected = selectedClients.has(id);
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
                          onChange={() => handleSelectClient(id)}
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
                            setSelectedClient({ name, address, id });
                            setNewClientData({ name, address });
                            handleAddClientOpen();
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
        open={addClientOpen}
        onClose={handleAddClientOpen}
        title={selectedClient ? "Edit Client" : "Add New Client"}
        confirmText="Submit"
        onConfirm={handleNewClientSubmit}
      >
        <form onSubmit={handleNewClientSubmit}>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Client Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Client Name"
              name="name"
              value={newClientData?.name || ""}
              onChange={handleNewClientChange}
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Client Address
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Client Address"
              name="address"
              value={newClientData?.address || ""}
              onChange={handleNewClientChange}
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Clients;
