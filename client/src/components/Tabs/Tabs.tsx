import { ReactNode } from "react";
import { RawText } from "../RawText/RawText";
import "./tabs.scss";

type TabConfig = {
  header: string;
  component: ReactNode;
};

type TabsProps = {
  tabs: TabConfig[];
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabIndex,
  setActiveTabIndex,
}) => {
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
              <div style={{ marginTop: "24px" }}>
                {activeTabIndex === index && tab.component}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
