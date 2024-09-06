import { ProductsCategorySlide } from "./components/ProductsCategorySlideProps/ProductsCategorySlide";
import {
  Category,
  MOCK_CATEGORY_NAMES,
} from "../../DataModel/Objects/Category";
import { useEffect, useMemo } from "react";
import { Product } from "../../DataModel/Objects/Product";
import { FiltersPane } from "./components/FiltersPane/FiltersPane";
import { Navbar } from "../../components/Navbar/Navbar";
import { useProducts } from "../../Hooks/UseProducts";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { colors } from "../../styles/colors";
import { RawText } from "../../components/RawText/RawText";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

export const Home: React.FC = () => {
  const {
    fetchProductsWithFilters,
    filters,
    isLoading: isLoadingProducts,
    products,
  } = useProducts();

  const {
    categories,
    currentFilters,
    freeSearchFilter,
    inStock,
    maxPrice,
    minPrice,
    selectedCategories,
    setFreeSearchFilter,
    setInStock,
    setMaxPrice,
    setMinPrice,
    setSelectedCategories,
  } = filters;

  useEffect(() => {
    fetchProductsWithFilters();
  }, []);

  const { productsByCategories } = useMemo(() => {
    const productsByCategories: {
      [categoryId: string]: {
        category: Category;
        products: Product[];
      };
    } = {};

    products?.forEach((product) => {
      const category = product.category;
      const categoryId = category?._id;

      if (!categoryId || !category.isActive) {
        return;
      }

      if (!productsByCategories[categoryId]) {
        productsByCategories[categoryId] = {
          category,
          products: [],
        };
      }

      productsByCategories[categoryId].products.push(product);
    });

    return { productsByCategories };
  }, [products]);

  return (
    <div>
      <Navbar
        freeSearchFilter={freeSearchFilter}
        setFreeSearchFilter={setFreeSearchFilter}
        onEnterDown={(searchString) => {
          fetchProductsWithFilters(false, searchString);
        }}
      />
      <div className="flex column-gap-24 relative justify-center">
        <FiltersPane
          fetchProducts={fetchProductsWithFilters}
          categories={categories}
          inStock={inStock}
          maxPrice={maxPrice}
          minPrice={minPrice}
          selectedCategories={selectedCategories}
          currentFilters={currentFilters}
          setInStock={setInStock}
          setMaxPrice={setMaxPrice}
          setMinPrice={setMinPrice}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="flex layout-column row-gap-24 overflow-hidden flex-1">
          {Object.values(productsByCategories).map(({ category, products }) => {
            return (
              <ProductsCategorySlide
                key={category._id}
                categoryName={category.name}
                products={products}
                isLoading={isLoadingProducts}
              />
            );
          })}
          {isLoadingProducts &&
            Object.values(MOCK_CATEGORY_NAMES).map((categoryName) => {
              return (
                <ProductsCategorySlide
                  key={categoryName}
                  categoryName={categoryName}
                  products={[]}
                  isLoading={true}
                />
              );
            })}
          {!products.length && (
            <div className="flex flex-1 flex-height-100 flex-100 align-center justify-center">
              <div className="flex align-center layout-column row-gap-24">
                <div className="flex align-center column-gap-8">
                  <ChatBubbleOvalLeftEllipsisIcon
                    height={24}
                    width={24}
                    color={colors.gray02}
                  />
                  <RawText
                    fontSize={32}
                    fontWeight={700}
                    text="No products found"
                  />
                </div>
                <PrimaryButton
                  label="Clear filters"
                  onClick={() => {
                    fetchProductsWithFilters(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
