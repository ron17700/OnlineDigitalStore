import { Cart, CartItem } from "../../../../../../DataModel/Objects/Cart";
import { colors } from "../../../../../../styles/colors";
import { RawText } from "../../../../../RawText/RawText";
import { Shimmer } from "../../../../../Shimmer/Shimmer";
import { TrashIcon } from "@heroicons/react/16/solid";
import "./cart-item-card.scss";

type CartItemCardProps = {
  cartItem: Cart["products"][0] | null;
  isLoading: boolean;
  removeItem: (cartItem: CartItem) => void;
};

export const CartItemCard: React.FC<CartItemCardProps> = ({
  cartItem,
  removeItem,
  isLoading,
}) => {
  const subTotalPrice =
    (cartItem?.product.price || 0) * (cartItem?.quantity || 0);

  return (
    <div className="cart-item-card-container overflow-hidden">
      <div className="flex space-between overflow-hidden height-fit-content column-gap-16">
        <div className="flex align-center column-gap-16 overflow-hidden">
          {isLoading ? (
            <Shimmer height="60px" width="60px" />
          ) : (
            <img
              src={cartItem?.product.images[0]}
              height={60}
              width={60}
              style={{ objectFit: "contain" }}
            />
          )}
          <div className="flex layout-column row-gap-2 overflow-hidden">
            {isLoading ? (
              <Shimmer />
            ) : (
              <RawText text={cartItem?.product.name} />
            )}
            {isLoading ? (
              <Shimmer width="30px" />
            ) : (
              <RawText
                fontSize={14}
                fontWeight={500}
                color={colors.gray02}
                text={`Quantity: ${cartItem?.quantity.toLocaleString()}`}
              />
            )}
          </div>
        </div>
        {!!cartItem && (
          <div
            className="remove-button-container"
            onClick={() => removeItem(cartItem)}
          >
            <TrashIcon height={16} width={16} color={colors.gray02} />
          </div>
        )}
      </div>
      {isLoading ? (
        <Shimmer width="200px" />
      ) : (
        <RawText
          text={`Item subtotal: $${subTotalPrice.toFixed(2).toLocaleString()}`}
          color={colors.gray02}
        />
      )}
    </div>
  );
};
