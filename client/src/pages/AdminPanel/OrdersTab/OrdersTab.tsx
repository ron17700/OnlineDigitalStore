import { useEffect, useState } from "react";
import { Order } from "../../../DataModel/Objects/Order"; // You will need to define this type
import { getOrders } from "../../../Requests/Order/GetOrders"; // You will need to create this request
import { useAuth0 } from "@auth0/auth0-react";
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import OrdersTable from "./OrdersTable"; // You will need to create this component

export const OrdersTab: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [orders, setOrders] = useState<Order[]>();
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const getOrdersRequest = useOceanRequest({
    request: getOrders,
  });

  const fetchOrders = () => {
    setIsLoadingOrders(true);
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
  };

  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      return;
    }

    fetchOrders();
  }, [isLoading, isAuthenticated]);

  if (isLoading || isLoadingOrders) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {orders && <OrdersTable data={orders} onRefresh={fetchOrders} />}
    </div>
  );
};
