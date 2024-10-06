import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Types/Routes";
import { Loader } from "../Loader/Loader";
import { useHasAdminPermission } from "../../Hooks/UsePermissions";

type AdminRouteProps = {
  children: React.ReactNode;
};

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const isAdmin = useHasAdminPermission();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated || !isAdmin) {
    Navigate({
      to: ROUTES.LOGIN,
    });

    return null;
  }

  return <>{children}</>;
};
