import { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { ProductsTab } from "./ProductsTab/ProductsTab";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Types/Routes";
import { OrdersTab } from "./OrdersTab/OrdersTab";
import { AnalyticsTab } from "./ AnalyticsTab/AnalyticsTab";

export const AdminPanel: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(1);

  const renderContent = () => {
    switch (tabIndex) {
      case 1:
        return <OrdersTab/>;
      case 2:
        return <ProductsTab/>
      case 3:
        return <AnalyticsTab/>
      default:
        return <div>Default Content</div>;
    }
  };

  if (!isAuthenticated && !isLoading) {
    navigate(`/${ROUTES.LOGIN}`);
    return null;
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar setTabIndex={setTabIndex} tabIndex={tabIndex}/>
      <div className="flex layout-column row-gap-24" style={{ flexGrow: 1 }}>
        {renderContent()}
      </div>
    </div>
  );
};
