import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Text } from "../../../../../components/Text/Text";
import { colors } from "../../../../../styles/colors";
import { Separator } from "../../../../../components/Separator/Separator";
import { ROUTES } from "../../../../../App";
import "./user-profile-menu.scss";

export const UserProfileMenu: React.FC = () => {
  const { user, logout } = useAuth0();

  return (
    <div style={{ maxWidth: "200px" }} className="user-profile-menu-container">
      <div className="user-info-container">
        <div className="flex align-center column-gap-16 user-info-content-container">
          <img
            src={user?.picture}
            alt={user?.name}
            height={40}
            width={40}
            referrerPolicy="no-referrer"
            className="overflow-hidden"
            style={{ borderRadius: "50%" }}
          />
          <div className="flex layout-column">
            <Text text="Profile" color={colors.gray02} fontSize={16} />
            <Text text={user?.name} />
          </div>
        </div>
      </div>
      <Separator />
      <div className="logout-container">
        <div
          className="logout-container-content"
          onClick={() => {
            logout({
              logoutParams: {
                returnTo: `${window.location.origin}/${ROUTES.LOGIN}`,
              },
            });
          }}
        >
          <Text text="Logout" />
        </div>
      </div>
    </div>
  );
};
