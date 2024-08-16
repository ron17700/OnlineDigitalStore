import { ReactNode, useContext } from "react";
import { SIDE_PANELS, SidePanelTypes } from "../../Types/SidePanels";
import { SidePanelContext } from "../../Contexts/SidePanelContext";
import { getClassName } from "../../Utils/getClassName";
import { RawText } from "../RawText/RawText";
import { NavbarButton } from "../../pages/Home/components/Navbar/NavbarButton/NavbarButton";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { colors } from "../../styles/colors";
import { YourOrdersSidePane } from "./Panes/YourOrdersSidePane/YourOrdersSidePane";
import "./side-panel.scss";

const PANES_MAP: {
  [key in SidePanelTypes]: ReactNode;
} = {
  [SIDE_PANELS.ORDERS_AND_SHOPPING_BAG]: <YourOrdersSidePane />,
};

const PANES_HEADER_MAP: {
  [key in SidePanelTypes]: string;
} = {
  [SIDE_PANELS.ORDERS_AND_SHOPPING_BAG]: "Your orders",
};

const getSidePaneContentByType = (type: SidePanelTypes | null) => {
  if (!type) {
    return null;
  }

  return PANES_MAP[type] || null;
};

const getSidePaneTitle = (type: SidePanelTypes | null) => {
  if (!type) {
    return null;
  }

  return PANES_HEADER_MAP[type] || null;
};

export const SidePanel: React.FC = () => {
  const { activeSidePanel, setActiveSidePanel } = useContext(SidePanelContext);
  const content = getSidePaneContentByType(activeSidePanel);
  const title = getSidePaneTitle(activeSidePanel);

  return (
    <div
      className={getClassName("general-side-pane-wrapper-container", {
        active: !!activeSidePanel,
      })}
      onClick={(e) => {
        setActiveSidePanel(null);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={getClassName("general-side-pane-content", {
          active: !!activeSidePanel,
        })}
      >
        <div className="side-pane-content-container">
          <div className={getClassName("side-pane-header-container")}>
            <div className="flex flex-100 justify-end">
              <NavbarButton
                icon={
                  <XMarkIcon height="32px" width="32px" color={colors.gray01} />
                }
                onClick={() => setActiveSidePanel(null)}
              />
            </div>

            <RawText text={title} fontWeight={900} fontSize={32} />
          </div>
          <div className={getClassName("side-pane-content")}>{content}</div>
        </div>
      </div>
    </div>
  );
};
