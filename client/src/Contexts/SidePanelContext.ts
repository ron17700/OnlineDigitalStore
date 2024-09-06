import { createContext, Dispatch, SetStateAction } from "react";
import { SidePanelTypes } from "../Types/SidePanels";

type SidePanelContextType = {
  setActiveSidePanel: Dispatch<SetStateAction<SidePanelTypes | null>>;
};

const initialValue: SidePanelContextType = {
  setActiveSidePanel: () => {},
};

const SidePanelContext = createContext(initialValue);

export { SidePanelContext };
