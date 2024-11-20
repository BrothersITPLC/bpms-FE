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
export default function RolePermissionMapping() {
  const [roles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
    { id: 3, name: "Viewer" },
  ]);
  const [permissions] = useState([
    { id: 1, name: "Create" },
    { id: 2, name: "Read" },
    { id: 3, name: "Update" },
    { id: 4, name: "Delete" },
  ]);
  const [rolePermissions, setRolePermissions] = useState({
    1: [1, 2, 3, 4],
    2: [2, 3],
    3: [2],
  });

  const handlePermissionChange = (roleId, permissionId) => {
    setRolePermissions((prevState) => {
      const updatedPermissions = prevState[roleId] || [];
      if (updatedPermissions.includes(permissionId)) {
        return {
          ...prevState,
          [roleId]: updatedPermissions.filter((id) => id !== permissionId),
        };
      } else {
        return {
          ...prevState,
          [roleId]: [...updatedPermissions, permissionId],
        };
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray">
          Role-Permission Mapping
        </Typography>
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
                  Role
                </Typography>
              </th>
              {permissions.map((permission) => (
                <th
                  key={permission.id}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {permission.name}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              const isLast = index === roles.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={role.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {role.name}
                    </Typography>
                  </td>
                  {permissions.map((permission) => (
                    <td key={permission.id} className={classes}>
                      <Checkbox
                        color="primary"
                        checked={(rolePermissions[role.id] || []).includes(
                          permission.id
                        )}
                        onChange={() =>
                          handlePermissionChange(role.id, permission.id)
                        }
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
