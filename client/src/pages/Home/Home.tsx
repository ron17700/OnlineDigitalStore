import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../App";
import { Navbar } from "./components/Navbar/Navbar";
import { ProductsCategorySlide } from "./components/ProductsCategorySlideProps/ProductsCategorySlide";
import { useOceanRequest } from "../../Hooks/UseOceanRequest";
import { getProducts } from "../../Requests/Product/GetProducts";
import { Category, CATEGORY_NAMES } from "../../DataModel/Objects/Category";
import { useMemo } from "react";
import { Product } from "../../DataModel/Objects/Product";

export const Home: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { isLoading: isLoadingProducts, response: products } = useOceanRequest({
    params: null,
    request: getProducts,
  });

  const { productsByCategories } = useMemo(() => {
    const productsByCategories: {
      [categoryId: string]: {
        category: Category;
        products: Product[];
      };
    } = {};

    products?.products?.forEach((product) => {
      const category = product.category;
      const categoryId = category?._id;

      if (!categoryId) {
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

  const navigate = useNavigate();

  if (!isAuthenticated && !isLoading) {
    navigate(`/${ROUTES.LOGIN}`);
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex layout-column row-gap-24">
        {Object.values(productsByCategories).map(({ category, products }) => {
          return (
            <ProductsCategorySlide
              categoryName={category.name}
              products={products}
              isLoading={isLoadingProducts}
            />
          );
        })}
        {isLoadingProducts &&
          Object.values(CATEGORY_NAMES).map((categoryName) => {
            return (
              <ProductsCategorySlide
                categoryName={categoryName}
                products={[]}
                isLoading={true}
              />
            );
          })}
      </div>
    </div>
  );
};
