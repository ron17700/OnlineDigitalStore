import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../Login/components/LogoutButton/LogoutButton";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../App";
import { Navbar } from "./components/Navbar/Navbar";

export const Home: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated && !isLoading) {
    navigate(`/${ROUTES.LOGIN}`);
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <UserProfile />
      <LogoutButton />
    </div>
  );
};
