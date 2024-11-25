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
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";

const TABLE_HEAD = [
  {
    head: "Department ID",
    icon: <Checkbox />,
  },
  {
    head: "Department Name",
  },
  {
    head: "Manager",
  },
];

const TABLE_ROWS = [
  {
    department_id: "D-1",
    department_name: "Technical",
    manager: "Seblewongel Hailu",
  },
  {
    department_id: "D-2",
    department_name: "Finance",
    manager: "Fasika Getachew",
  },
  {
    department_id: "D-3",
    department_name: "HR",
    manager: "Kbruysfa Desalegn",
  },
  {
    department_id: "D-4",
    department_name: "Procurement",
    manager: "Yohannes Assefa",
  },
];

const Departments = () => {
  const [addDepartmentOpen, setAddDepartmentOpen] = useState(false);
  const [departmentDetailsOpen, setDepartmentDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newDepartmentData, setNewDepartmentData] = useState({
    department_name: "",
    manager: "",
  });
  const [departmentDetailsData, setDepartmentDetailsData] = useState({
    department_name: "",
    manager: "",
  });

  const handleAddDepartmentOpen = () =>
    setAddDepartmentOpen(!addDepartmentOpen);
  const handleDepartmentDetailsOpen = () =>
    setDepartmentDetailsOpen(!departmentDetailsOpen);

  const handleNewDepartmentChange = (event) => {
    const { name, value } = event.target;
    setNewDepartmentData({ ...newDepartmentData, [name]: value });
  };

  const handleDepartmentDetailsChange = (event) => {
    const { name, value } = event.target;
    setDepartmentDetailsData({ ...departmentDetailsData, [name]: value });
  };

  const handleNewDepartmentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate a backend call to add the new department
    setTimeout(() => {
      console.log("New Department Added:", newDepartmentData);
      setIsLoading(false);
      handleAddDepartmentOpen();
    }, 1000);
  };

  const handleIconClick = (departmentName, manager) => {
    setDepartmentDetailsData({
      department_name: departmentName,
      manager: manager,
    });
    handleDepartmentDetailsOpen();
  };

  return (
    <>
      <Card className="h-full w-fit flex-1">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="flex justify-between">
            <div className="w-fit">
              <Input
                label="Search Department"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              className="bg-primary1 flex items-center gap-3"
              size="sm"
              onClick={handleAddDepartmentOpen}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Department
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
            {TABLE_ROWS.map(
              ({ department_id, department_name, manager }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                return (
                  <tr key={department_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        <Checkbox />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {department_id}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {department_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {manager}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>

      {/* Modal for Adding a Department */}
      <Modal
        open={addDepartmentOpen}
        onClose={handleAddDepartmentOpen}
        title="Add New Department"
        confirmText={isLoading ? "Adding..." : "Add"}
        onConfirm={handleNewDepartmentSubmit}
        disabled={isLoading}
        className="relative -z-20"
      >
        <div className="-z-10 flex flex-col gap-4">
          <Input
            label="Department Name"
            name="department_name"
            value={newDepartmentData.department_name}
            onChange={handleNewDepartmentChange}
            required
          />
          <Select
            size="lg"
            variant="outlined"
            label="Manager"
            name="manager"
            value={newDepartmentData.manager}
            onChange={(value) =>
              setNewDepartmentData({ ...newDepartmentData, manager: value })
            }
            required
            className="relative z-50"
          >
            <Option value="Seblewongel Hailu">Seblewongel Hailu</Option>
            <Option value="Fasika Getachew">Fasika Getachew</Option>
            <Option value="Kbruysfa Desalegn">Kbruysfa Desalegn</Option>
            <Option value="Yohannes Assefa">Yohannes Assefa</Option>
          </Select>
        </div>
      </Modal>
    </>
  );
};

export default Departments;
