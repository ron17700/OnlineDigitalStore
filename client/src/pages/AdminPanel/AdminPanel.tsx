import { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { ProductsTab } from "./ProductsTab/ProductsTab";
import { OrdersTab } from "./OrdersTab/OrdersTab";
import { AnalyticsTab } from "./ AnalyticsTab/AnalyticsTab";
import { CategoriesTab } from "./CategoriesTab/CategoriesTab";

export const AdminPanel: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(1);

  const renderContent = () => {
    switch (tabIndex) {
      case 1:
        return <OrdersTab />;
      case 2:
        return <ProductsTab />;
      case 3:
        return <AnalyticsTab />;
      case 4:
        return <CategoriesTab />;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar setTabIndex={setTabIndex} tabIndex={tabIndex} />
      <div className="flex layout-column row-gap-24" style={{ flexGrow: 1 }}>
        {renderContent()}
      </div>
    </div>
  );
};
