import { ProductCard } from "../../../../components/ProductCard/ProductCard";
import { RawText } from "../../../../components/RawText/RawText";
import { CategoryNames } from "../../../../DataModel/Objects/Category";
import { Product } from "../../../../DataModel/Objects/Product";
import { getCategoryTranslation } from "../../../../translations/categories";
import "./products-category-slide.scss";

interface ProductsCategorySlideProps {
  categoryName: CategoryNames;
  products: Product[];
  isLoading?: boolean;
}

export const ProductsCategorySlide: React.FC<ProductsCategorySlideProps> = ({
  categoryName,
  products,
  isLoading,
}) => {
  const translatedCategory = getCategoryTranslation(categoryName);

  return (
    <div className="products-category-slide-container">
      <div className="category-title-container">
        <RawText text={translatedCategory} fontWeight={700} fontSize={28} />
      </div>
      <div className="products-container flex-100 overflow-x-scroll flex column-gap-16">
        {products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              isLoading={isLoading}
            />
          );
        })}
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => {
            return (
              <ProductCard key={index} product={null} isLoading={isLoading} />
            );
          })}
      </div>
    </div>
  );
};
