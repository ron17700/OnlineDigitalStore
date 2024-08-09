import { ReactNode, useState } from "react";
import { RawText } from "../RawText/RawText";
import "./tabs.scss";

type TabConfig = {
  header: string;
  component: ReactNode;
};

type TabsProps = {
  tabs: TabConfig[];
};

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="tabs-navigation-container">
      <div className="tabs-header">
        <div className="tabs-header-container">
          {tabs.map((tab, index) => {
            return (
              <div
                className="tab-button"
                key={tab.header}
                onClick={(e) => {
                  setActiveTabIndex(index);
                }}
              >
                <RawText
                  text={tab.header}
                  fontWeight={500}
                  fontSize={18}
                  className="centered-absolute absolute z-index-5"
                />
              </div>
            );
          })}
          <div
            className="active-tab-button-container"
            style={{
              width: `calc(100% / ${tabs.length})`,
              transform: `translateX(calc(100% * ${activeTabIndex}))`,
            }}
          >
            <div className="active-tab-button" />
          </div>
        </div>
      </div>
      <div className="tabs-container">
        {tabs.map((tab, index) => {
          return (
            <div
              key={tab.header}
              className="tab-content-container"
              style={{
                transform: `translateX(calc(-100% * ${activeTabIndex}))`,
              }}
            >
              {activeTabIndex === index && tab.component}
            </div>
          );
        })}
      </div>
    </div>
  );
};
