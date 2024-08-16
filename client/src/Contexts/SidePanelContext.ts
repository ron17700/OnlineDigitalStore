import { createContext, Dispatch, SetStateAction } from "react";
import { SidePanelTypes } from "../Types/SidePanels";

type SidePanelContextType = {
  activeSidePanel: SidePanelTypes | null;
  setActiveSidePanel: Dispatch<SetStateAction<SidePanelTypes | null>>;
};

const initialValue: SidePanelContextType = {
  activeSidePanel: null,
  setActiveSidePanel: () => {},
};

const SidePanelContext = createContext(initialValue);

export { SidePanelContext };
