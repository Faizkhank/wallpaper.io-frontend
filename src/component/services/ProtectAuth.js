import { Outlet, Navigate } from "react-router-dom";
import { UserAuth } from "./ContextAuth";

const ProtectAuth = () => {
  const { user } = UserAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectAuth;
