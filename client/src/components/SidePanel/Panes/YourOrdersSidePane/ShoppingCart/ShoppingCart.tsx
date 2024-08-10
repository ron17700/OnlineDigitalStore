import { useState } from "react";
import { Cart, CartItem } from "../../../../../DataModel/Objects/Cart";
import { PrimaryButton } from "../../../../PrimaryButton/PrimaryButton";
import { CartItemCard } from "./CartItemCard/CartItemCard";

type ShoppingCartProps = {
  isLoading: boolean;
  cart: Cart | null;
  removeItemFromCart: (cartItem: CartItem) => void;
};

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  isLoading,
  removeItemFromCart,
}) => {
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const itemsTotal = cart?.products
    .reduce((acc, cartItem) => {
      return acc + cartItem.quantity * cartItem.product.price || 0;
    }, 0)
    .toFixed(2);

  const getContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => {
        return (
          <CartItemCard
            key={index}
            isLoading={isLoading}
            cartItem={null}
            removeItem={removeItemFromCart}
          />
        );
      });
    }

    if (isCheckoutMode) {
      // TODO: Implement checkout mode
    }

    return cart?.products.map((cartItem) => {
      return (
        <CartItemCard
          cartItem={cartItem}
          isLoading={isLoading}
          key={cartItem.product._id}
          removeItem={removeItemFromCart}
        />
      );
    });
  };

  return (
    <div className="flex layout-column row-gap-16">
      {getContent()}
      {!isLoading && (
        <PrimaryButton
          label={`Checkout: ${itemsTotal}$`}
          onClick={() => {
            setIsCheckoutMode(!isCheckoutMode);
          }}
          style={{ width: "fit-content" }}
          className="align-self-center"
        />
      )}
    </div>
  );
};
