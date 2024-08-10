import { Cart, CartItem } from "../../../../../DataModel/Objects/Cart";
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

  return <div className="flex layout-column row-gap-16">{getContent()}</div>;
};
