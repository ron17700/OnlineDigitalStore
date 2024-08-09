import { useState } from "react";
import { colors } from "../../styles/colors";
import { RawText } from "../RawText/RawText";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Shimmer } from "../Shimmer/Shimmer";
import { ProductModal } from "./ProductModal/ProductModal";
import { Product } from "../../DataModel/Objects/Product";
import "./product-card.scss";

interface ProductCardProps {
  product: Product | null;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLoading,
}) => {
  const { description, name, price, quantity, images } = product || {};
  const img = images?.[0];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (product) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
                text={`${price?.toLocaleString()}$`}
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
              text={`${quantity?.toLocaleString()} left`}
              color={colors.gray02}
              fontSize={14}
            />
          )}
        </div>
      </div>
      {!!product && (
        <ProductModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          product={product}
        />
      )}
    </>
  );
};
