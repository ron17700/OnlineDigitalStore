import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "../Loader/Loader";
import { useHasAdminPermission } from "../../Hooks/UsePermissions";
import { useNavigate } from "react-router-dom"; // Import useNavigate

type AdminRouteProps = {
  children: React.ReactNode;
};

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const isAdmin = useHasAdminPermission();
  const navigate = useNavigate(); // Initialize navigate hook

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated || !isAdmin) {
    navigate("/login"); // Redirect to /login if not authenticated or not an admin
    return null; // Return null after redirecting to avoid rendering the 404 message
  }

  return <>{children}</>;
};
