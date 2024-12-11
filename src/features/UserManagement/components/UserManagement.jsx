import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
  useRegisterEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../userAPI";
import { useGetDepartmentQuery } from "../../Department/api/department";
import { toast } from "react-toastify";
import { formatFriendlyDate } from "../../../../helpers/formatingDateUserFreindly";
const TABS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const TABLE_HEAD = ["Member", "Position", "Status", "Employed", ""];
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Helen Tesfaye",
    email: "helen.tesfaye@brothersitplc.com",
    job: "Manager",
    org: "Technical",
    active: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Yordanos Mengist",
    email: "yordanos.mengist@brothersitplc.com",
    job: "Deputy Manager",
    org: "Technical",
    active: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Yohannes Assefa",
    email: "yohannes.assefa@brothersitplc.com",
    job: "Engineer",
    org: "Presale Engineer",
    active: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Seblewongel Hailu",
    email: "seblewongel.hailu@brothersitplc.com",
    job: "Engineer",
    org: "Presale Engineer",
    active: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Kbruysfa Desalegn",
    email: "kbruysfa.desalegn@brothersitplc.com",
    job: "Engineer",
    org: "Presale Engineer",
    active: false,
    date: "04/10/21",
  },
];

const UserManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [registerEmployee, { isLoading }] = useRegisterEmployeeMutation();
  const [formData, setFormData] = useState({
    department: "",
    email: "",
    id: "",
  });
  const [editingUser, setEditingUser] = useState(null); // New state for the user being edited
  const [selectedID, setSelectedID] = useState();
  const handleDeleteUser = async (id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      console.log("Deleted user:", name);
      try {
        await deleteEmployee({ id }).unwrap();
        refetchEmployee();
        toast.success("deleted successfully");
      } catch (error) {
        toast.error("error please try again");
      }
      // Here, you can add your API call to delete the user.
    }
  };

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const { data: employees, refetch: refetchEmployee } = useGetEmployeeQuery();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const handleOpenModal = (user = null) => {
    if (user) {
      setFormData({
        department: user.department || "",
        email: user.email,
        id: user.id,
      });
      setEditingUser(user); // Set the user to be edited
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null); // Reset editing user when closing modal
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    try {
      if (editingUser) {
        await updateEmployee({
          id: formData?.id,
          data: {
            email: formData?.email,
            department: formData?.department,
          },
        });
        // Update logic (you may call an API to update the user)
        // console.log("Updating user:", formData);
      } else {
        await registerEmployee(formData).unwrap();
      }
      handleCloseModal();
      refetchEmployee();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredRows = TABLE_ROWS.filter((row) => {
    if (selectedTab === "active") return row.active === true;
    if (selectedTab === "inactive") return row.active === false;
    return true;
  });

  const { data: departments } = useGetDepartmentQuery({ search: "" });

  return (
    <>
      <div className="flex-1 ml-64 p-6">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Members List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  View All
                </Button>
                <Button
                  className="flex bg-primary1 items-center gap-3"
                  size="sm"
                  onClick={() => handleOpenModal()} // Open modal for adding new user
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add User
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value={selectedTab} className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setSelectedTab(value)}
                    >
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
                {employees?.map((employee, index) => {
                  const isLast = index === filteredRows.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={employee?.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                            alt={name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            {/* <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography> */}

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {employee?.email}
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
                            {employee?.department_name}
                          </Typography>
                          {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {org}
                          </Typography> */}
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            // value={active ? "active" : "inactive"}
                            // color={active ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatFriendlyDate(employee?.date_joined)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex justify-end gap-2">
                          <Tooltip content="Edit">
                            <div className="flex flex-row">
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  handleOpenModal({
                                    email: employee?.email,
                                    department: employee?.department,
                                    id: employee?.id,
                                    // org,
                                    // active,
                                    // date,
                                  })
                                }
                              >
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </div>
                          </Tooltip>
                          <Tooltip content="Delete">
                            <div className="flex flex-row">
                              <IconButton
                                variant="text"
                                onClick={() => handleDeleteUser(employee?.id)} // Add the delete logic here
                              >
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>

      {/* Modal for Adding/Editing User */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        title={editingUser ? "Edit User" : "Add User"}
        confirmText={isLoading ? "Loading..." : editingUser ? "Update" : "Add"}
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
        confirmDisabled={isLoading}
      >
        <form className="flex flex-col gap-6 w-full" onChange={handleChange}>
          <select
            value={formData?.department}
            className="h-[3rem] rounded border-primary1 border"
            name="department"
            onChange={handleChange}
          >
            {" "}
            <option value="" disabled>
              Select Department
            </option>
            {departments?.map((department) => (
              <option key={department?.id} value={department?.id}>
                {department?.name}
              </option>
            ))}
          </select>

          <Input
            type="email"
            label="Email"
            name="email"
            required
            defaultValue={formData.email}
          />
        </form>
      </Modal>
    </>
  );
};

export default UserManagement;
