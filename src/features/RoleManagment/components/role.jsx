import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import {
  useAddRoleMutation,
  useGetRolesQuery,
  useUpdateRoleMutation,
} from "../api";

export default function RoleManagement() {
  const [roleds, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
    { id: 3, name: "Viewer" },
  ]);
  const [newRole, setNewRole] = useState("");
  const [editingRole, setEditingRole] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { data: roles, refetch: refetchRoles } = useGetRolesQuery();
  const [addRole] = useAddRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const addRoleHandler = async () => {
    if (newRole) {
      try {
        await addRole({ name: newRole }).unwrap();
        refetchRoles();
      } catch (error) {
        console.log(error);
      }
      setNewRole("");
      setIsAddDialogOpen(false);
    }
  };

  const updateRoleHandler = async () => {
    if (editingRole) {
      try {
        await updateRole({
          id: editingRole?.id,
          data: { name: editingRole?.name },
        });
        refetchRoles();
      } catch (error) {
        console.log(error);
      }

      setEditingRole(null);
      setIsEditDialogOpen(false);
    }
  };

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <Card className="w-full" shadow={false}>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex items-center justify-between gap-8">
          <Typography variant="h5" color="blue-black">
            Role Management
          </Typography>
          <Button
            className="flex items-center bg-primary1 py-2 px-2 gap-3"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <FaPlus className="h-4 w-4 " /> Add Role
          </Button>
        </div>
      </CardHeader>
      <CardBody className="px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Role Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {roles?.map(({ id, name }, index) => {
              const isLast = index === roles.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex gap-4">
                      <Button
                        size="sm"
                        color="primary"
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setEditingRole({ id, name });
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <FaPencilAlt className="h-4 w-4" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={() => deleteRole(id)}
                      >
                        <FaTrash className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      <Dialog open={isAddDialogOpen} handler={() => setIsAddDialogOpen(false)}>
        <DialogHeader>Add New Role</DialogHeader>
        <DialogBody>
          <Input
            label="Role Name"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsAddDialogOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="primary" onClick={addRoleHandler}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        handler={() => setIsEditDialogOpen(false)}
      >
        <DialogHeader>Edit Role</DialogHeader>
        <DialogBody>
          <Input
            label="Role Name"
            value={editingRole ? editingRole.name : ""}
            onChange={(e) =>
              setEditingRole({ ...editingRole, name: e.target.value })
            }
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsEditDialogOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="primary"
            onClick={updateRoleHandler}
          >
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
