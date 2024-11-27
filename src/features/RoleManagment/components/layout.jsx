import { NavLink, Outlet } from "react-router-dom";
import { Card, CardBody } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export default function RoleLayout() {
  const location = useLocation();

  return (
    <div className="container mx-auto py-10">
      {/* Navigation Header */}
      <Card className="w-full mb-8">
        <CardBody className="flex space-x-6">
          {/* Role Management Link */}
          <NavLink
            to="/role-management"
            className={({ isActive }) =>
              isActive
                ? "text-primary1 font-bold border-b-2 border-primary1 transition-colors duration-300"
                : "text-gray-600 hover:text-primary1 transition-colors duration-300"
            }
          >
            Role Management
          </NavLink>

          {/* Role-Permission Mapping Link */}
          <NavLink
            to="/role-management/role-permission-mapping"
            className={({ isActive }) =>
              isActive
                ? "text-primary1 font-bold border-b-2 border-primary1 transition-colors duration-300"
                : "text-gray-600 hover:text-primary1 transition-colors duration-300"
            }
          >
            Role-Permission Mapping
          </NavLink>

          {/* Permission Management Link */}
          <NavLink
            to="/role-management/permission-management"
            className={({ isActive }) =>
              isActive
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
