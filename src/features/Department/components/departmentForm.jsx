import Modal from "../../../components/Modal";
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
import {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useGetDetailDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../api/department";
import { useState } from "react";
import { useEffect } from "react";
const DepartmentForm = ({
  addDepartmentOpen,
  handleAddDepartmentOpen,
  id,
  onSave,
}) => {
  const [newDepartmentData, setNewDepartmentData] = useState({
    department_name: "",
    manager: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { data: department } = useGetDetailDepartmentQuery(
    { id },
    {
      skip: id == null,
    }
  );
  const [addDepartment] = useAddDepartmentMutation();

  const [editDepartment] = useUpdateDepartmentMutation();
  const handleNewDepartmentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!id) {
        await addDepartment({
          name: newDepartmentData?.department_name?.toUpperCase(),
        });
      } else {
        await editDepartment({
          id,
          data: {
            name: newDepartmentData?.department_name?.toUpperCase(),
          },
        }).unwrap();
      }
      setIsLoading(false);
      handleAddDepartmentOpen();
      onSave();
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewDepartmentChange = (event) => {
    const { name, value } = event.target;

    setNewDepartmentData({ ...newDepartmentData, [name]: value });
  };

  useEffect(() => {
    if (department) setNewDepartmentData({ department_name: department?.name });
    else {
      setNewDepartmentData({ department_name: "" });
    }
  }, [department]);

  return (
    <Modal
      open={addDepartmentOpen}
      onClose={() => {
        handleAddDepartmentOpen();
        setNewDepartmentData({ department_name: "" });
      }}
      title={id ? "Editing   Department" : "Add New Department"}
      confirmText={isLoading ? "Adding..." : "Add"}
      onConfirm={handleNewDepartmentSubmit}
      disabled={isLoading}
    >
      <Input
        label="Department Name"
        name="department_name"
        value={newDepartmentData.department_name}
        onChange={handleNewDepartmentChange}
        required
      />
    </Modal>
  );
};

export default DepartmentForm;
