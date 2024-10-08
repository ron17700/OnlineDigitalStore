import { useEffect, useState } from "react";
import { useOceanRequest } from "../../../../Hooks/UseOceanRequest";
import { getCart } from "../../../../Requests/Cart/GetCart";
import { Tabs } from "../../../Tabs/Tabs";
import { Cart, CartItem } from "../../../../DataModel/Objects/Cart";
import { toast } from "react-toastify";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import { Orders } from "./Orders/Orders";
import { updateCart } from "../../../../Requests/Cart/UpdateCart";
import { getOrders } from "../../../../Requests/Order/GetOrders";
import { Order, ORDER_STATUSES } from "../../../../DataModel/Objects/Order";
import { deleteOrder } from "../../../../Requests/Order/DeleteOrder";
import { updateOrder } from "../../../../Requests/Order/UpdateOrder";
import { deepClone } from "../../../../Utils/ObjectUtils";
import { getAddresses } from "../../../../Requests/Address/GetAddresses";
import { Address } from "../../../../DataModel/Objects/Address";
import {useAuth0} from "@auth0/auth0-react";

export const YourOrdersSidePane: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [cart, setCart] = useState<Cart | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const { user} = useAuth0();

  const getAddressesRequest = useOceanRequest({
    request: getAddresses,
  });

  const updateCartRequest = useOceanRequest({
    request: updateCart,
  });

  const getCartRequest = useOceanRequest({
    request: getCart,
  });

  const getOrdersRequest = useOceanRequest({
    request: getOrders,
  });

  const deleteOrderRequest = useOceanRequest({
    request: deleteOrder,
  });

  const cancelOrderRequest = useOceanRequest({
    request: updateOrder,
  });

  useEffect(() => {
    setIsLoadingCart(true);
    setIsLoadingOrders(true);
    setIsLoadingAddresses(true);

    getOrdersRequest(null)
      .then((res) => {
        const myOrders = res.filter(order => order.user === user?.sub);
        setOrders(myOrders);
      })
      .catch((err) => {
        setOrders([]);
        toast.error("Failed to get orders");
      })
      .finally(() => {
        setIsLoadingOrders(false);
      });

    getCartRequest(null)
      .then((res) => {
        setCart(res);
      })
      .catch((err) => {
        setCart(null);
        toast.error("Failed to get cart");
      })
      .finally(() => {
        setIsLoadingCart(false);
      });

    getAddressesRequest(null)
      .then((res) => {
        setAddresses(res);
      })
      .catch((err) => {
        setAddresses([]);
        toast.error("Failed to get addresses");
      })
      .finally(() => {
        setIsLoadingAddresses(false);
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
        toast.success("Cart item has been removed from cart")
      })
      .catch(() => {
        toast.error("Failed to update cart");
        setCart(oldCart);
      });
  };

  const cancelOrder = (order: Order) => {
    if (order.status !== ORDER_STATUSES.Created) {
      return;
    }

    const index = orders.findIndex((o) => o._id === order._id);

    if (index === -1) {
      return;
    }

    const newOrder = deepClone(order);

    newOrder.status = ORDER_STATUSES.Cancelled;

    const newOrders = [...orders];
    const oldOrders = [...orders];

    newOrders[index] = newOrder;

    setOrders(newOrders);

    cancelOrderRequest({
      orderId: newOrder._id,
      order: newOrder,
    })
      .then((response) => {
        toast.success("Order Successfully canceled");
      })
      .catch(() => {
        toast.error("Failed to cancel order");
        setOrders(oldOrders);
      });
  };

  const removeOrder = (order: Order) => {
    if (
      order.status !== ORDER_STATUSES.Delivered &&
      order.status !== ORDER_STATUSES.Cancelled
    ) {
      return;
    }

    const index = orders.findIndex((o) => o._id === order._id);

    if (index === -1) {
      return;
    }

    const newOrders = [...orders];
    const oldOrders = [...orders];

    newOrders.splice(index, 1);

    setOrders(newOrders);

    deleteOrderRequest({
      orderId: order._id,
    })
      .then((response) => {
        toast.success("Order Successfully removed");
      })
      .catch(() => {
        toast.error("Failed to remove order");
        setOrders(oldOrders);
      });
  };

  return (
    <Tabs
      activeTabIndex={activeTabIndex}
      setActiveTabIndex={setActiveTabIndex}
      tabs={[
        {
          header: "Shopping cart",
          component: (
            <ShoppingCart
              cart={cart}
              isLoadingCart={isLoadingCart}
              removeItemFromCart={removeItemFromCart}
              addresses={addresses}
              isLoadingAddresses={isLoadingAddresses}
            />
          ),
        },
        {
          header: "Orders",
          component: (
            <Orders
              orders={orders}
              isLoading={isLoadingOrders}
              removeOrder={removeOrder}
              cancelOrder={cancelOrder}
              moveToShoppingCart={() => {
                setActiveTabIndex(0);
              }}
            />
          ),
        },
      ]}
    />
  );
};
