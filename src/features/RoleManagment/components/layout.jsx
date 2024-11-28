import { NavLink, Outlet } from "react-router-dom";
import { Card, CardBody } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export default function RoleLayout() {
  const location = useLocation();

  const is_active = (path) => {
    return location.pathname == path;
  };
  return (
    <div className=" w-full px-[10%]  py-10">
      {/* Navigation Header */}
      <Card shadow={false} className="w-full border mb-8">
        <CardBody className="flex space-x-6">
          {/* Role Management Link */}
          <NavLink
            to="/role-management"
            className={
              is_active("/role-management")
                ? "text-primary1 font-bold border-b-2 border-primary1 transition-colors duration-300"
                : "text-gray-600 hover:text-primary1 transition-colors duration-300"
            }
          >
            Role Management
          </NavLink>

          {/* Role-Permission Mapping Link */}
          <NavLink
            to="/role-management/role-permission-mapping"
            className={
              is_active("/role-management/role-permission-mapping")
                ? "text-primary1 font-bold border-b-2 border-primary1 transition-colors duration-300"
                : "text-gray-600 hover:text-primary1 transition-colors duration-300"
            }
          >
            Role-Permission Mapping
          </NavLink>

          {/* Permission Management Link */}
          <NavLink
            to="/role-management/permission-management"
            className={
              is_active("/role-management/permission-management")
                ? "text-primary1 font-bold border-b-2 border-primary1 transition-colors duration-300"
                : "text-primary1 hover:text-primary1 transition-colors duration-300"
            }
          >
            Permission Management
          </NavLink>
        </CardBody>
      </Card>

      {/* Page Content with Transition */}
      <div
        key={location.pathname}
        className="animate-fade-in transition-opacity duration-500 ease-in-out"
      >
        <Outlet />
      </div>
    </div>
  );
}
