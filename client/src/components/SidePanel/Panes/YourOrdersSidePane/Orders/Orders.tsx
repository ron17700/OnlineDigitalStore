import {
  Order,
  ORDER_STATUSES,
  OrderStatus,
} from "../../../../../DataModel/Objects/Order";
import { OrderItemCard } from "./OrderItemCard/OrderItemCard";

const sortOrders = (orders: Order[]): Order[] => {
  return orders.sort((a, b) => {
    const statusOrder: { [key in OrderStatus]?: number } = {
      [ORDER_STATUSES.Cancelled]: 1,
      [ORDER_STATUSES.Delivered]: 2,
    };

    const statusAIndex = statusOrder[a.status] || 0;
    const statusBIndex = statusOrder[b.status] || 0;

    if (statusAIndex !== statusBIndex) {
      return statusAIndex - statusBIndex;
    }

    // Sorting by createdAt (newest first)
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });
};

type OrdersProps = {
  orders: Order[];
  isLoading: boolean;
  cancelOrder: (order: Order) => void;
  removeOrder: (order: Order) => void;
};

export const Orders: React.FC<OrdersProps> = ({
  isLoading,
  orders,
  removeOrder,
  cancelOrder,
}) => {
  const sortedOrders = sortOrders(orders);
  console.log(sortedOrders);

  const getContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => {
        return (
          <OrderItemCard
            key={index}
            isLoading={isLoading}
            orderItem={null}
            removeOrder={removeOrder}
            cancelOrder={cancelOrder}
          />
        );
      });
    }

    return sortedOrders.map((cartItem) => {
      return (
        <OrderItemCard
          orderItem={cartItem}
          isLoading={isLoading}
          key={cartItem._id}
          removeOrder={removeOrder}
          cancelOrder={cancelOrder}
        />
      );
    });
  };

  return <div className="flex layout-column row-gap-16">{getContent()}</div>;
};
