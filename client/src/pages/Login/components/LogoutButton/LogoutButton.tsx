import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ROUTES } from "../../../../App";

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => {
        logout({
          logoutParams: {
            returnTo: `${window.location.origin}/${ROUTES.LOGIN}`,
          },
        });
      }}
    >
      Log Out
    </button>
  );
};
