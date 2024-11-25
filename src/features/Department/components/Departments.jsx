import React, { useState, useEffect } from "react";
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
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
import {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
} from "../api/department";

import DepartmentForm from "./departmentForm";

const Departments = () => {
  const [addDepartmentOpen, setAddDepartmentOpen] = useState(false);
  const [editDepartmentOpen, setEditDepartmentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const { data: departments, refetch: refetchDepartment } =
    useGetDepartmentQuery();

  const [deleteDepartment] = useDeleteDepartmentMutation();

  const handleAddDepartmentOpen = () =>
    setAddDepartmentOpen(!addDepartmentOpen);
  const handleEditDepartmentOpen = () =>
    setEditDepartmentOpen(!editDepartmentOpen);

  const handleDeleteDepartment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (confirmDelete) {
      await deleteDepartment(id).unwrap();
      refetchDepartment();
    }
  };

  const handleOnSave = () => {
    refetchDepartment();
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
              onClick={() => {
                setSelectedID(null);
                handleAddDepartmentOpen();
              }}
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Department
            </Button>
          </div>
        </CardHeader>

        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-gray-300 p-4">Department ID</th>
              <th className="border-b border-gray-300 p-4">Department Name</th>
              <th className="border-b border-gray-300 p-4">Manager</th>
              <th className="border-b border-gray-300 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments?.map((department) => (
              <tr key={department.id}>
                <td className="p-4">{department.id}</td>
                <td className="p-4">{department.name}</td>
                <td className="p-4">{department.manager || "-"}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-blue-500"
                      onClick={() => {
                        setSelectedID(department?.id);
                        handleAddDepartmentOpen();
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500"
                      onClick={() => handleDeleteDepartment(department.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <DepartmentForm
        addDepartmentOpen={addDepartmentOpen}
        handleAddDepartmentOpen={handleAddDepartmentOpen}
        id={selectedID}
        onSave={handleOnSave}
      />

      {/* Edit Department Modal */}
    </>
  );
};

export default Departments;
