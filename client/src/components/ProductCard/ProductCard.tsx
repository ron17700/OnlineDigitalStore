import { useState } from "react";
import { colors } from "../../styles/colors";
import { RawText } from "../RawText/RawText";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Shimmer } from "../Shimmer/Shimmer";
import Modal from "../Modal/Modal"; // Import the Modal component
import "./product-card.scss";
import { ProductModal } from "./ProductModal/ProductModal";

interface ProductCardProps {
  img: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  _id: string;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  description,
  img,
  name,
  price,
  quantity,
  _id,
  isLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="product-card-container box-shadow"
        onClick={handleOpenModal}
      >
        {isLoading ? (
          <div className="product-image">
            <Shimmer height="100%" width="100%" borderRadius="16px" />
          </div>
        ) : (
          <img className="product-image" src={img} />
        )}
        <div className="product-details-container flex align-center column-gap-24 space-between">
          <div className="flex layout-column row-gap-4 overflow-hidden">
            {isLoading ? <Shimmer /> : <RawText text={name} fontWeight={500} />}
            {isLoading ? (
              <Shimmer height="23px" width="200px" />
            ) : (
              <RawText text={description} color={colors.gray02} fontSize={16} />
            )}
          </div>
          {isLoading ? (
            <Shimmer height="30px" width="60px" />
          ) : (
            <div className="pricing-container">
              <RawText
                text={`${price.toLocaleString()}$`}
                color={colors.blue03}
                fontSize={14}
              />
            </div>
          )}
        </div>
        <div className="product-quantity-container">
          <Squares2X2Icon height="16px" width="16px" color={colors.blue03} />
          {isLoading ? (
            <Shimmer height="20px" width="60px" />
          ) : (
            <RawText
              text={`${quantity.toLocaleString()} left`}
              color={colors.gray02}
              fontSize={14}
            />
          )}
        </div>
      </div>
      <ProductModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        product={{
          description: description,
          img: img,
          name: name,
          price: price,
          quantity: quantity,
          _id: _id,
        }}
      ></ProductModal>
    </>
  );
};
