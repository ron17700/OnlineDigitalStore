import { colors } from "../../../../../../styles/colors";
import { RawText } from "../../../../../RawText/RawText";
import { Shimmer } from "../../../../../Shimmer/Shimmer";
import {
  Order,
  ORDER_STATUSES,
} from "../../../../../../DataModel/Objects/Order";
import "./order-item-card.scss";
import { formatDate } from "../../../../../../Utils/TimeUtils";
import { SecondaryButton } from "../../../../../SecondaryButton/SecondaryButton";
import { HomeIcon } from "@heroicons/react/16/solid";
import { DeleteButton } from "../../../../../DeleteButton/DeleteButton";

type OrderItemCardProps = {
  orderItem: Order | null;
  isLoading: boolean;
  removeOrder: (order: Order) => void;
  cancelOrder: (order: Order) => void;
};

export const OrderItemCard: React.FC<OrderItemCardProps> = ({
  orderItem,
  isLoading,
  removeOrder,
  cancelOrder,
}) => {
  const orderId = orderItem?._id || "--";

  const orderDate = orderItem?.createdAt
    ? formatDate(orderItem.createdAt)
    : "--";

  const lastUpdatedAt = orderItem?.updatedAt
    ? formatDate(orderItem.updatedAt, true)
    : "--";

  const status = orderItem?.status || "--";
  const totalPricing = orderItem?.price || 0;

  const address = orderItem?.address || null;

  const getProducts = () => {
    const products = orderItem?.products || [];
    if (!isLoading) {
     return Array.from({ length: products.length }).map((_, index) => {
       return (
           <img key={index} className="product-image" src={products[index].product.images[0]}
                title={products[index].product.name} alt={products[index].product.name}/>
       )
     });
    }
  }

  return (
    <div className="cart-item-card-container overflow-hidden">
      <div className="flex align-center column-gap-16 overflow-hidden">
        <div className="flex layout-column row-gap-4 flex-1 overflow-hidden">
          <div className="flex align-center space-between column-gap-16 flex-1 overflow-hidden">
            {isLoading ? (
              <Shimmer />
            ) : (
              <RawText
                text={`${orderDate}`}
                fontSize={14}
                fontWeight={500}
                color={colors.gray02}
              />
            )}
          </div>
          {isLoading ? (
            <Shimmer />
          ) : (
            <div className="flex align-center column-gap-8 overflow-hidden">
              <div className="home-icon-container">
                <HomeIcon height={16} width={16} color={colors.gray02} />
              </div>
              {!!address && (
                <RawText
                  text={`${address.street}, ${address.city}, ${address.postalCode}, ${address.state}, ${address.country}`}
                  fontSize={14}
                  fontWeight={500}
                  color={colors.gray02}
                />
              )}
            </div>
          )}
          {isLoading ? (
            <Shimmer />
          ) : (
            <RawText
              text={`Status: ${status}`}
              fontSize={14}
              fontWeight={500}
              color={colors.gray02}
            />
          )}
          {isLoading ? (
            <Shimmer />
          ) : (
            <RawText
              text={`Updated at: ${lastUpdatedAt}`}
              fontSize={14}
              fontWeight={500}
              color={colors.gray02}
            />
          )}
          {isLoading ? (
              <Shimmer />
          ) : <div className="products-container">{getProducts()}</div>}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden space-between column-gap-16 align-center">
        {isLoading ? (
          <Shimmer width="200px" />
        ) : (
          <RawText
            text={`Total pricing: $${totalPricing.toFixed(2).toLocaleString()}`}
            color={colors.blue02}
          />
        )}
        {orderItem && status === ORDER_STATUSES.Created && (
          <SecondaryButton
            label="Cancel"
            style={{
              width: "fit-content",
              flex: "unset",
            }}
            onClick={() => cancelOrder(orderItem)}
          />
        )}
        {orderItem && status === ORDER_STATUSES.Cancelled && (
          <DeleteButton
            label="Remove"
            style={{
              width: "fit-content",
              flex: "unset",
            }}
            onClick={() => removeOrder(orderItem)}
          />
        )}
      </div>
    </div>
  );
};
