import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectTo = "/" }) => {
  const user = useSelector((state) => state.auth.user);

  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
