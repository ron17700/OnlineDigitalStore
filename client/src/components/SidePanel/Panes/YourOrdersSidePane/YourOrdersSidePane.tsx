import { useEffect, useState } from "react";
import { useOceanRequest } from "../../../../Hooks/UseOceanRequest";
import { getCart } from "../../../../Requests/Cart/GetCart";
import { Tabs } from "../../../Tabs/Tabs";
import { Cart, CartItem } from "../../../../DataModel/Objects/Cart";
import { toast } from "react-toastify";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import { Orders } from "./Orders/Orders";
import { updateCart } from "../../../../Requests/Cart/UpdateCart";

export const YourOrdersSidePane: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const updateCartRequest = useOceanRequest({
    request: updateCart,
  });

  const getCartRequest = useOceanRequest({
    request: getCart,
  });

  useEffect(() => {
    setIsLoadingCart(true);
    getCartRequest(null)
      .then((res) => {
        setCart(res);
      })
      .catch((err) => {
        toast.error("Failed to get cart");
      })
      .finally(() => {
        setIsLoadingCart(false);
      });
  }, []);

  const removeItemFromCart = (cartItem: CartItem) => {
    if (!cart) {
      return;
    }

    const newCart = { ...cart };
    const oldCart = { ...cart };

    newCart.products = newCart?.products?.filter(
      (item) => item.product._id !== cartItem.product._id
    );

    setCart(newCart);

    updateCartRequest({
      cart: newCart,
    })
      .then((response) => {
        toast.success("Cart updated successfully");
      })
      .catch(() => {
        toast.error("Failed to update cart");
        setCart(oldCart);
      });
  };

  return (
    <Tabs
      tabs={[
        {
          header: "Shopping cart",
          component: (
            <ShoppingCart
              cart={cart}
              isLoading={isLoadingCart}
              removeItemFromCart={removeItemFromCart}
            />
          ),
        },
        {
          header: "Orders",
          component: <Orders />,
        },
      ]}
    />
  );
};
