import { useEffect, useState } from "react";
import { Order } from "../../../DataModel/Objects/Order"; // You will need to define this type
import { getOrders } from "../../../Requests/Order/GetOrders"; // You will need to create this request
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import OrdersTable from "./OrdersTable"; // You will need to create this component

export const OrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>();
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const getOrdersRequest = useOceanRequest({
    request: getOrders,
  });

  const fetchOrders = () => {
    setIsLoadingOrders(true);
    getOrdersRequest(null)
      .then((response) => {
        setOrders(response);
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
    fetchOrders();
  }, []);

  if (isLoadingOrders) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {orders && <OrdersTable data={orders} onRefresh={fetchOrders} />}
    </div>
  );
};
