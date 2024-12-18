import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  useGetDetailDepartmentQuery,
  useUpdateDepartmentMutation,
  useFetchDepartmentManagersQuery,
  useFetchDepartmentUserStatusQuery,
  useUpdateDepartmentEmployeeMutation,
  useUpdateDepartmentManagerMutation,
  useDeleteDepartmentEmployeeMutation,
} from "../api/department";

const DepartmentEditForm = ({
  editDepartmentOpen,
  handleEditDepartmentOpen,
  departmentId,
  onSave,
}) => {
  const [newDepartmentData, setNewDepartmentData] = useState({
    department_name: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { data: department } = useGetDetailDepartmentQuery(
    { departmentId },
    {
      skip: departmentId == null,
    }
  );
  const [editDepartment] = useUpdateDepartmentMutation();

  const { data: managers } = useFetchDepartmentManagersQuery(departmentId, {
    skip: departmentId == null,
  });
  const { data: employees } = useFetchDepartmentUserStatusQuery(departmentId, {
    skip: departmentId == null,
  });

  const [updateDepartmentManager] = useUpdateDepartmentManagerMutation();
  const [updateDepartmentEmployee] = useUpdateDepartmentEmployeeMutation();
  const [deleteDepartmentEmployee] = useDeleteDepartmentEmployeeMutation();

  const handleManagerSelect = async (managerId) => {
    try {
      const response = await updateDepartmentManager({
        employee_id: managerId,
        department_id: departmentId,
      }).unwrap();
      console.log("Manager updated successfully:", response);
    } catch (error) {
      console.error("Error updating manager:", error);
    }
  };

  const handleEmployeeAdd = async (employeeId) => {
    try {
      const response = await updateDepartmentEmployee({
        employee_id: employeeId,
        department_id: departmentId,
      }).unwrap();
      console.log("Employee added successfully:", response);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEmployeeRemove = async (employeeId) => {
    try {
      const response = await deleteDepartmentEmployee({
        employee_id: employeeId,
        department_id: departmentId,
      }).unwrap();
      console.log("Employee removed successfully:", response);
    } catch (error) {
      console.error("Error removing employee:", error);
    }
  };
  const handleNewDepartmentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await editDepartment({
        id,
        data: {
          name: newDepartmentData?.department_name?.toUpperCase(),
          manager: newDepartmentData?.manager,
          employee: newDepartmentData?.employee,
        },
      }).unwrap();

      setIsLoading(false);
      handleEditDepartmentOpen();
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
    if (department) {
      setNewDepartmentData({
        department_name: department?.name,
        manager: department?.manager || "",
        employee: department?.employee || "",
      });
    } else {
      setNewDepartmentData({ department_name: "", manager: "", employee: "" });
    }
  }, [department]);

  const staffEmployees = employees?.filter((emp) => emp.isStaff);
  const nonStaffEmployees = employees?.filter((emp) => !emp.isStaff);

  return (
    <Modal
      open={editDepartmentOpen}
      onClose={() => {
        handleEditDepartmentOpen();
        setNewDepartmentData({
          department_name: "",
          manager: "",
          employee: "",
        });
      }}
      title="Editing Department"
      confirmText={isLoading ? "Editing..." : "Edit"}
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

      <div className="flex flex-col gap-4 mt-8">
        {/* Manager Selection */}
        <Menu>
          <MenuHandler>
            <button className="w-full p-2 border rounded text-left">
              {newDepartmentData.manager
                ? managers.find((mgr) => mgr.id === newDepartmentData.manager)
                    ?.name
                : "Select Manager"}
            </button>
          </MenuHandler>
          <MenuList className="z-[9999]">
            {managers?.map((manager) => (
              <MenuItem
                key={manager.id}
                onClick={() => handleManagerSelect(manager.id)}
              >
                {manager?.full_name} {manager?.isManager && "*"}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        {/* Employee Selection */}
        <Menu>
          <MenuHandler>
            <button className="w-full p-2 border rounded text-left">
              Select Employee
            </button>
          </MenuHandler>
          <MenuList className="z-[9999]">
            {/* Staff Employees */}
            {staffEmployees?.map((employee, index) => (
              <MenuItem
                key={employee.id}
                onClick={() => handleEmployeeRemove(employee.id)}
                className="flex items-center justify-between"
              >
                {employee.username}
                <span className="text-red-600">x</span>
              </MenuItem>
            ))}
            {/* Divider */}
            {nonStaffEmployees?.length > 0 && (
              <hr className="my-2 border-t border-gray-300" />
            )}
            {/* Non-Staff Employees */}
            {nonStaffEmployees?.map((employee) => (
              <MenuItem
                key={employee.id}
                onClick={() => handleEmployeeAdd(employee.id)}
                className="flex items-center justify-between"
              >
                {employee.username}
                <span className="text-green-500">+</span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
    </Modal>
  );
};

export default DepartmentEditForm;
