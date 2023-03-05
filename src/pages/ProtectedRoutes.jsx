import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

export const ProtectedSignUpRoutes = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? <Navigate to="/dashboard" /> : <Outlet />;
};

export const ProtectedDashboardRoutes = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};
