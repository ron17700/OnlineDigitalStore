import { useEffect, useMemo, useState } from "react";
import { Product } from "../../../DataModel/Objects/Product";
import { Category } from "../../../DataModel/Objects/Category";
import { getOrders } from "../../../Requests/Order/GetOrders";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import { ROUTES } from "../../../Types/Routes";
import OrdersTable from "./OrdersTable";
import { Order } from "../../../DataModel/Objects/Order";

export const OrdersTab: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>();
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  
    const getOrdersRequest = useOceanRequest({
      request: getOrders,
    });
  
    useEffect(() => {
      if (!isAuthenticated || isLoading) {
        return;
      }
  
      getOrdersRequest(null)
        .then((response) => {
          setOrders(response.orders);
        })
        .catch((err) => {
          console.error(err);
          setOrders([]);
        })
        .finally(() => {
          setIsLoadingOrders(false);
        });
    }, [isLoading, isAuthenticated]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {orders && <OrdersTable data={orders} />}
    </div>
  );
};
