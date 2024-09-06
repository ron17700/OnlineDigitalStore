import { useContext, useState } from "react";
import { Cart, CartItem } from "../../../../../DataModel/Objects/Cart";
import { PrimaryButton } from "../../../../PrimaryButton/PrimaryButton";
import { CartItemCard } from "./CartItemCard/CartItemCard";
import { Checkout } from "./Checkout/Checkout";
import { Address } from "../../../../../DataModel/Objects/Address";
import { useOceanRequest } from "../../../../../Hooks/UseOceanRequest";
import { createOrder } from "../../../../../Requests/Order/CreateOrder";
import { ORDER_STATUSES } from "../../../../../DataModel/Objects/Order";
import { SidePanelContext } from "../../../../../Contexts/SidePanelContext";
import { toast } from "react-toastify";
import { SecondaryButton } from "../../../../SecondaryButton/SecondaryButton";
import { SIDE_PANELS } from "../../../../../Types/SidePanels";
import { useProducts } from "../../../../../Hooks/UseProducts";
import { deepClone } from "../../../../../Utils/ObjectUtils";
import { RawText } from "../../../../RawText/RawText";

type ShoppingCartProps = {
  isLoadingCart: boolean;
  cart: Cart | null;
  addresses: Address[];
  isLoadingAddresses: boolean;
  removeItemFromCart: (cartItem: CartItem) => void;
};

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  isLoadingCart,
  removeItemFromCart,
  addresses,
  isLoadingAddresses,
}) => {
  const { setActiveSidePanel } = useContext(SidePanelContext);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const { products, setProducts } = useProducts(false);

  const createOrderRequest = useOceanRequest({
    request: createOrder,
  });
  const itemsTotal = cart?.products
    .reduce((acc, cartItem) => {
      return acc + cartItem.quantity * cartItem.product.price || 0;
    }, 0)
    .toFixed(2);

  const getContent = () => {
    if (isLoadingCart) {
      return Array.from({ length: 3 }).map((_, index) => {
        return (
          <CartItemCard
            key={index}
            isLoading={isLoadingCart}
            cartItem={null}
            removeItem={removeItemFromCart}
          />
        );
      });
    }

    if (isCheckoutMode) {
      return (
        <div className="flex layout-column row-gap-16">
          <Checkout
            addresses={addresses}
            isLoadingAddresses={isLoadingAddresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          <div className="flex align-center column-gap-16">
            <SecondaryButton
              label="Manage your addresses"
              style={{
                alignSelf: "center",
              }}
              onClick={() => {
                setActiveSidePanel(SIDE_PANELS.ADDRESSES);
              }}
            />
            {!isLoadingCart && !!addresses.length && (
              <PrimaryButton
                disabled={!selectedAddress}
                label={`Order now`}
                onClick={() => {
                  if (!selectedAddress) {
                    return;
                  }

                  const clonedProducts = deepClone(products);
                  const updatedProducts = clonedProducts.map((product) => {
                    const cartProduct = cart?.products.find(
                      (cartProduct) => cartProduct.product._id === product._id
                    );

                    if (cartProduct) {
                      product.quantity -= cartProduct.quantity;
                    }

                    return product;
                  });

                  setProducts(updatedProducts);

                  setActiveSidePanel(null);

                  createOrderRequest({
                    order: {
                      address: selectedAddress._id,
                      isActive: true,
                      status: ORDER_STATUSES.Created,
                      products: cart?.products || [],
                      price:
                        cart?.products.reduce(
                          (prev, product) => prev + product.product.price,
                          0
                        ) || 0,
                    },
                  })
                    .then(() => {
                      toast.success("Order has been created successfully");
                    })
                    .catch(() => {
                      toast.error("Order creation has been failed");
                      setProducts(products);
                    });
                }}
                style={{ width: "fit-content" }}
                className="align-self-center"
              />
            )}
          </div>
        </div>
      );
    }

    if (!cart?.products.length) {
      return (
        <div className="flex-100 flex align-center layout-column row-gap-8">
          <RawText text="Its look like you don't have any items in the cart." />
          <PrimaryButton
            label="Start shopping"
            onClick={() => {
              setActiveSidePanel(null);
            }}
          />
        </div>
      );
    }

    return (
      <>
        {cart?.products.map((cartItem) => {
          return (
            <CartItemCard
              cartItem={cartItem}
              isLoading={isLoadingCart}
              key={cartItem.product._id}
              removeItem={removeItemFromCart}
            />
          );
        })}
        {!isLoadingCart && !!cart?.products.length && (
          <PrimaryButton
            label={`Checkout: ${itemsTotal}$`}
            onClick={() => {
              setIsCheckoutMode(!isCheckoutMode);
            }}
            style={{ width: "fit-content" }}
            className="align-self-center"
          />
        )}
      </>
    );
  };

  return <div className="flex layout-column row-gap-16">{getContent()}</div>;
};
