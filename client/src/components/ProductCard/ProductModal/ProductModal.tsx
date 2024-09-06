import { useState } from "react";
import { colors } from "../../../styles/colors";
import { RawText } from "../../RawText/RawText";
import Modal from "../../Modal/Modal";
import styles from "./ProductModal.module.scss";
import { getCart } from "../../../Requests/Cart/GetCart";
import { updateCart } from "../../../Requests/Cart/UpdateCart";
import { Cart } from "../../../DataModel/Objects/Cart";
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import { toast } from "react-toastify";
import { Product } from "../../../DataModel/Objects/Product";
import { PrimaryButton } from "../../PrimaryButton/PrimaryButton";
import { SecondaryButton } from "../../SecondaryButton/SecondaryButton";

interface ProductModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  product: Product;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isModalOpen,
  handleCloseModal,
  product,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [count, setCount] = useState(Math.min(1, product.quantity));
  const getCartRequest = useOceanRequest({
    request: getCart,
  });

  const updateCartRequest = useOceanRequest({
    request: updateCart,
  });

  const handleAddToCartButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isUpdating) {
      return;
    }

    setIsUpdating(true);
    return getCartRequest(null)
      .then((cart) => {
        // You can add your logic to handle the cart response here
        const productsMap = new Map(
          cart.products.map((item) => [item.product._id, item])
        );
        let productFromMap = productsMap.get(product._id);

        if (!productFromMap) {
          productFromMap = {
            product,
            quantity: 0,
          };
        }

        productFromMap.quantity += count;
        productsMap.set(productFromMap.product._id, productFromMap);

        const newCart: Cart = {
          ...cart,
          products: Array.from(productsMap.values()),
        };

        updateCartRequest({
          cart: newCart,
        })
          .then((response) => {
            toast.success("Cart updated successfully");
          })
          .catch(() => {
            toast.error("Failed to update cart");
          });
      })
      .catch(() => {
        toast.error("Failed to get cart");
      })
      .finally(() => {
        setIsUpdating(false);
        handleCloseModal();
      });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <div className={styles.modalContainer}>
        <img
          src={product.images[0]}
          alt={product.name}
          className={styles.modalImage}
        />
        <div className={styles.modalContent}>
          <div className={styles.modalText}>
            <RawText
              text={product.name}
              color={colors.gray02}
              fontSize={24}
              fontWeight={1000}
            />
          </div>
          <div className={styles.modalPrice}>
            <RawText
              text={`${product.price}$`}
              color={colors.blue03}
              fontSize={16}
              fontWeight={600}
            />
          </div>
          <div className={styles.modalDescription}>
            <RawText
              text={product.description}
              color={colors.gray02}
              fontSize={16}
              lineClamp={7}
            />
          </div>
          <div className={styles.modalFooter}>
            <div className={styles.modalActions}>
              <PrimaryButton
                label={`Add To Cart ${(count * product.price)
                  .toFixed(2)
                  .toLocaleString()}$`}
                onClick={handleAddToCartButton}
                disabled={isUpdating || !product.quantity}
              />

              <SecondaryButton
                style={{
                  flex: "unset",
                  width: "fit-content",
                  cursor: "default",
                }}
                label={
                  <div className="flex align-center column-gap-16">
                    <RawText
                      text={"-"}
                      color={colors.blue03}
                      fontSize={16}
                      fontWeight={600}
                      onClick={
                        count > 1
                          ? () => {
                              setCount(count - 1);
                            }
                          : undefined
                      }
                    />
                    <div className={styles.quantityValue}>
                      <RawText
                        text={count.toString()}
                        color={colors.blue03}
                        fontSize={16}
                        fontWeight={600}
                      />
                    </div>
                    <RawText
                      text={"+"}
                      color={colors.blue03}
                      fontSize={16}
                      fontWeight={600}
                      onClick={
                        count < product.quantity
                          ? () => {
                              setCount(count + 1);
                            }
                          : undefined
                      }
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
