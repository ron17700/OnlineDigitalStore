import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { LogoutButton } from "./components/LogoutButton/LogoutButton";
import { LoginButton } from "./components/LoginButton/LoginButton";
import "./App.css";

export const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const getContent = () => {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (isAuthenticated) {
      return (
        <div>
          <UserProfile />
          <LogoutButton />
        </div>
      );
    }

    return <LoginButton />;
  };

  return <div className="App">{getContent()}</div>;
};
