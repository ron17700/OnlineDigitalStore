import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { colors } from "../../../styles/colors";
import { RawText } from "../../RawText/RawText";
import Modal from "../../Modal/Modal"; // Import the Modal component
import styles from "./ProductModal.module.scss";
import { fetchOceanRequest } from "../../../Hooks/fetchOceanRequest";
import { getCart } from "../../../Requests/Cart/GetCart";
import { updateCart } from "../../../Requests/Cart/UpdateCart";
import { ICartItem } from "../../../DataModel/Objects/Cart";

interface Product {
  img: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  _id: string;
}

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
  const [count, setCount] = useState(1);
  const { getAccessTokenSilently } = useAuth0();

  async function handleAddToCartButton(
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    try {
      const token = await getAccessTokenSilently();
      const { isLoading: getCartLoading, response: getCartResponse } =
        await fetchOceanRequest({
          params: null, // replace with actual cartId
          request: getCart,
          token,
        });

      if (getCartResponse) {
        console.log("Cart Response:", getCartResponse);

        // You can add your logic to handle the cart response here
        const newProducts: ICartItem[] = [
          ...getCartResponse.products,
          { product: product, quantity: count } as unknown as ICartItem,
        ];

        const { isLoading: updateCartLoading, response: updateCartResponse } =
          await fetchOceanRequest({
            params: { cart: { ...getCartResponse, products: newProducts } },
            request: updateCart,
            token,
          });

        if (updateCartResponse) {
          handleCloseModal();
          //popup or smth
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <div className={styles.modalContainer}>
        <img
          src={product.img}
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
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCartButton}
              >
                <RawText
                  text={"Add To Cart"}
                  color={colors.white}
                  fontSize={16}
                  fontWeight={600}
                />
                <RawText
                  text={`${count * product.price}$`}
                  color={colors.white}
                  fontSize={16}
                  fontWeight={600}
                />
              </button>
              <div className={styles.quantityContainer}>
                <button
                  className={styles.quantityButton}
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <RawText
                    text={"-"}
                    color={colors.blue03}
                    fontSize={16}
                    fontWeight={600}
                  />
                </button>
                <div className={styles.quantityValue}>
                  <RawText
                    text={count.toString()}
                    color={colors.blue03}
                    fontSize={16}
                    fontWeight={600}
                  />
                </div>
                <button
                  className={styles.quantityButton}
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <RawText
                    text={"+"}
                    color={colors.blue03}
                    fontSize={16}
                    fontWeight={600}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
