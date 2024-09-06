import {
  Order,
  ORDER_STATUSES,
  OrderStatus,
} from "../../../../../DataModel/Objects/Order";
import { PrimaryButton } from "../../../../PrimaryButton/PrimaryButton";
import { RawText } from "../../../../RawText/RawText";
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
  moveToShoppingCart: () => void;
};

export const Orders: React.FC<OrdersProps> = ({
  isLoading,
  orders,
  removeOrder,
  cancelOrder,
  moveToShoppingCart,
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

    if (!sortedOrders.length) {
      return (
        <div className="flex-100 flex align-center layout-column row-gap-8">
          <RawText text="Its look like you don't have any order." />
          <PrimaryButton
            label="Go to shopping cart"
            onClick={moveToShoppingCart}
          />
        </div>
      );
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
