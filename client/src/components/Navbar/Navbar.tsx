import { useContext, useState } from "react";
import { OceanLogo } from "../../components/OceanLogo/OceanLogo";
import { TooltipContentWrapper } from "../../components/TooltipContentWrapper/TooltipContentWrapper";
import { colors } from "../../styles/colors";
import { UserProfileMenu } from "./UserProfileMenu/UserProfileMenu";
import { NavbarButton } from "./NavbarButton/NavbarButton";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { OceanInput } from "../../components/OceanInput/OceanInput";
import { SidePanelContext } from "../../Contexts/SidePanelContext";
import { SIDE_PANELS } from "../../Types/SidePanels";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { RawText } from "../RawText/RawText";

interface NavbarProps {
  tabIndex?: number;
  setTabIndex?: React.Dispatch<React.SetStateAction<number>>;
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  return (
    <div className="navbar-container">
      <div className="navbar-content-container box-shadow">
        <Link to={"/"} className="logo-link">
          <OceanLogo RawTextSize={40} ShoppingBagIconSize="30px" />
        </Link>
        {location.pathname === "/" ? (
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
        ) : location.pathname === "/admin" ? (
          <div
            style={{
              width: "400px",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              className={`button-style ${
                props.tabIndex === 1 ? "active animate" : ""
              }`}
              onClick={() => {
                if (props.setTabIndex) {
                  props.setTabIndex(1);
                }
              }}
            >
              <RawText
                text={`Orders`}
                color={props.tabIndex === 1 ? colors.blue03 : undefined}
                fontSize={14}
                fontWeight={700}
              />
            </button>
            <button
              className={`button-style ${
                props.tabIndex === 2 ? "active animate" : ""
              }`}
              onClick={() => {
                if (props.setTabIndex) {
                  props.setTabIndex(2);
                }
              }}
            >
              <RawText
                text={`Products`}
                color={props.tabIndex === 2 ? colors.blue03 : undefined}
                fontSize={14}
                fontWeight={700}
              />
            </button>
            <button
              className={`button-style ${
                props.tabIndex === 3 ? "active animate" : ""
              }`}
              onClick={() => {
                if (props.setTabIndex) {
                  props.setTabIndex(3);
                }
              }}
            >
              <RawText
                text={`Analytics`}
                color={props.tabIndex === 3 ? colors.blue03 : undefined}
                fontSize={14}
                fontWeight={700}
              />
            </button>
            <button
              className={`button-style ${
                props.tabIndex === 4 ? "active animate" : ""
              }`}
              onClick={() => {
                if (props.setTabIndex) {
                  props.setTabIndex(4);
                }
              }}
            >
              <RawText
                text={`Categories`}
                color={props.tabIndex === 4 ? colors.blue03 : undefined}
                fontSize={14}
                fontWeight={700}
              />
            </button>
          </div>
        ) : null}
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
