import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Text } from "../../../../components/Text/Text";
import { colors } from "../../../../styles/colors";
import { TextTooltipWrapper } from "../../../../components/TextTooltipWrapper/TextTooltipWrapper";

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ maxWidth: "200px" }} className="overflow-hidden">
      <TextTooltipWrapper text="image tooltip">
        <img
          src={user?.picture}
          alt={user?.name}
          referrerPolicy="no-referrer"
        />
      </TextTooltipWrapper>
      <Text text={user?.name} />
      <Text text={user?.email} color={colors.gray02} />
    </div>
  );
};
