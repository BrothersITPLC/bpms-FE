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
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Checkbox,
} from "@material-tailwind/react";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";

// Role Management Component

// Role-Permission Mapping Component

// Permission Management Component
export default function PermissionManagement() {
  const [permissions, setPermissions] = useState([
    { id: 1, name: "Create" },
    { id: 2, name: "Read" },
    { id: 3, name: "Update" },
    { id: 4, name: "Delete" },
  ]);
  const [newPermission, setNewPermission] = useState("");
  const [editingPermission, setEditingPermission] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const addPermission = () => {
    if (newPermission) {
      setPermissions([
        ...permissions,
        { id: permissions.length + 1, name: newPermission },
      ]);
      setNewPermission("");
      setIsAddDialogOpen(false);
    }
  };

  const updatePermission = () => {
    if (editingPermission) {
      setPermissions(
        permissions.map((permission) =>
          permission.id === editingPermission.id
            ? editingPermission
            : permission
        )
      );
      setEditingPermission(null);
      setIsEditDialogOpen(false);
    }
  };

  const deletePermission = (id) => {
    setPermissions(permissions.filter((permission) => permission.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex items-center justify-between gap-8">
          <Typography variant="h5" color="blue-gray">
            Permission Management
          </Typography>
          <Button
            className="flex items-center gap-3"
            color="primary"
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <FaPlus className="h-4 w-4" /> Add Permission
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
                  Permission Name
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
            {permissions.map(({ id, name }, index) => {
              const isLast = index === permissions.length - 1;
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
                          setEditingPermission({ id, name });
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
                        onClick={() => deletePermission(id)}
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
        <DialogHeader>Add New Permission</DialogHeader>
        <DialogBody>
          <Input
            label="Permission Name"
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
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
          <Button variant="gradient" color="primary" onClick={addPermission}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        handler={() => setIsEditDialogOpen(false)}
      >
        <DialogHeader>Edit Permission</DialogHeader>
        <DialogBody>
          <Input
            label="Permission Name"
            value={editingPermission ? editingPermission.name : ""}
            onChange={(e) =>
              setEditingPermission({
                ...editingPermission,
                name: e.target.value,
              })
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
          <Button variant="gradient" color="primary" onClick={updatePermission}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}

// Main App Component
