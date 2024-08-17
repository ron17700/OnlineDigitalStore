import { useContext, useState } from "react";
import { OceanLogo } from "../../../../components/OceanLogo/OceanLogo";
import { TooltipContentWrapper } from "../../../../components/TooltipContentWrapper/TooltipContentWrapper";
import { colors } from "../../../../styles/colors";
import { UserProfileMenu } from "./UserProfileMenu/UserProfileMenu";
import { NavbarButton } from "./NavbarButton/NavbarButton";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { OceanInput } from "../../../../components/OceanInput/OceanInput";
import { SidePanelContext } from "../../../../Contexts/SidePanelContext";
import { SIDE_PANELS } from "../../../../Types/SidePanels";
import { NAVBAR_HEIGHT } from "./constants";
import "./navbar.scss";

export const Navbar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div
      className="navbar-container"
      style={{
        height: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <div className="navbar-content-container box-shadow">
        <OceanLogo RawTextSize={40} ShoppingBagIconSize="30px" />
        <div
          style={{
            width: "500px",
          }}
        >
          <OceanInput
            onChange={setSearchValue}
            placeholder="Search for products..."
            value={searchValue}
            leftIcon={
              <MagnifyingGlassIcon
                height="16px"
                width="16px"
                color={colors.gray02}
              />
            }
          />
        </div>
        <RightNavbarContent />
      </div>
    </div>
  );
};

const RightNavbarContent: React.FC = () => {
  const [userProfileVisible, setUserProfileVisible] = useState(false);
  const { setActiveSidePanel } = useContext(SidePanelContext);

  return (
    <div className="flex align-center column-gap-16">
      <TooltipContentWrapper
        content={<UserProfileMenu />}
        delay={0}
        tooltipProps={{
          visible: userProfileVisible,
          placement: "bottom-end",
          onClickOutside: () => {
            setUserProfileVisible(false);
          },
        }}
      >
        <NavbarButton
          icon={<UserIcon height="20px" width="20px" color={colors.gray01} />}
          onClick={() => {
            setUserProfileVisible(!userProfileVisible);
          }}
        />
      </TooltipContentWrapper>
      <NavbarButton
        icon={
          <ShoppingCartIcon height="20px" width="20px" color={colors.gray01} />
        }
        onClick={() => {
          setActiveSidePanel(SIDE_PANELS.ORDERS_AND_SHOPPING_BAG);
        }}
      />
    </div>
  );
};
