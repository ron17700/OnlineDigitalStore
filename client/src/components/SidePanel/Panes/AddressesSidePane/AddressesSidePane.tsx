import { useState } from "react";
import { GooglePlacesAutocompleteWithMap } from "../../../GooglePlacesAutocomplete/GooglePlacesAutocomplete";
import { Tabs } from "../../../Tabs/Tabs";
import { Addresses } from "./Addresses";

const TABS = {
  ADDRESSES: "Addresses",
  CREATE_ADDRESS: "Create new address",
} as const;

export const AddressesSidePane: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Tabs
      activeTabIndex={activeTabIndex}
      setActiveTabIndex={setActiveTabIndex}
      tabs={[
        {
          header: TABS.ADDRESSES,
          component: (
            <Addresses
              moveToCreateAddress={() => {
                setActiveTabIndex(1);
              }}
            />
          ),
        },
        {
          header: TABS.CREATE_ADDRESS,
          component: (
            <GooglePlacesAutocompleteWithMap
              onAddressCreated={() => {
                setActiveTabIndex(0);
              }}
            />
          ),
        },
      ]}
    />
  );
};
