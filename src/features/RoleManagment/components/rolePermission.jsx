import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import {
  useAddPermissionToRoleMutation,
  useGetPermissionsQuery,
  useGetRolesQuery,
  useRemovePermissionFromRoleMutation,
} from "../api";

const RolePermissionMapping = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const [expandedGroups, setExpandedGroups] = useState({});
  const { data: Permissions } = useGetPermissionsQuery();
  const { data: Roles, refetch: refetchRoles } = useGetRolesQuery();
  const [removePermission] = useRemovePermissionFromRoleMutation();
  const [addPermissionToRole] = useAddPermissionToRoleMutation();

  const handlePermissionChange = async (roleId, permissionId) => {
    const role = Roles.find((role) => role.id === roleId);
    const hasPermission = role?.permissions?.includes(permissionId);

    try {
      if (hasPermission) {
        await removePermission({
          permission_id: permissionId,
          role_id: roleId,
        });
      } else {
        await addPermissionToRole({
          permission_id: permissionId,
          role_id: roleId,
        });
      }
      refetchRoles();
      toast.success("Permission updated successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update permission.");
    }
  };

  const groupPermissions = (permissions) => {
    return permissions?.reduce((groups, permission) => {
      const baseName = permission.codename.split("_").slice(1).join("_");
      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(permission);
      return groups;
    }, {});
  };

  const groupedPermissions = groupPermissions(Permissions);

  const toggleGroupVisibility = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="p-6 bg-white  rounded-lg flex flex-col">
      <ToastContainer />
      <div className="w-full h-full overflow-y-auto border-r border-gray-200 pr-4">
        <div className="flex justify-between mb-4">
          <div className="text-2xl font-bold">Roles</div>
        </div>

        <div className="uppercase flex space-x-2 border-b-2 border-gray-200">
          {Roles?.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`cursor-pointer px-4 py-2 ${
                selectedRole === role.id
                  ? "border-b-2 border-primary1 text-primary1"
                  : "text-gray-500"
              } hover:text-primary1`}
            >
              {role.name}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-h-[calc(100vh-20rem)] overflow-y-auto pb-24 mt-8 ml-4">
        {selectedRole && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Manage Permission
              <h2 className="uppercase">
                {Roles.find((role) => role.id === selectedRole)?.name}
              </h2>
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    permissions
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    toggle
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupedPermissions &&
                  Object.keys(groupedPermissions)?.map((group) => (
                    <React.Fragment key={group}>
                      <tr
                        onClick={() => toggleGroupVisibility(group)}
                        className="uppercase cursor-pointer bg-gray-50 px-6 py-3 text-left text-sm font-medium text-gray-900"
                      >
                        <td colSpan={2}>{group}</td>
                      </tr>
                      {expandedGroups[group] &&
                        groupedPermissions[group]?.map((permission) => (
                          <tr key={permission.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {permission.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <input
                                type="checkbox"
                                value={permission.id}
                                checked={Roles.find(
                                  (role) => role.id === selectedRole
                                )?.permissions?.includes(permission.id)}
                                onChange={() =>
                                  handlePermissionChange(
                                    selectedRole,
                                    permission.id
                                  )
                                }
                                className="form-checkbox h-5 w-5 text-green-600"
                              />
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default RolePermissionMapping;
