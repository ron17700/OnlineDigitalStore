import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { ProductsCategorySlide } from "./components/ProductsCategorySlideProps/ProductsCategorySlide";
import { useOceanRequest } from "../../Hooks/UseOceanRequest";
import {
  getProducts,
  GetProductsRequestParams,
} from "../../Requests/Product/GetProducts";
import {
  Category,
  MOCK_CATEGORY_NAMES,
} from "../../DataModel/Objects/Category";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../../DataModel/Objects/Product";
import { ROUTES } from "../../Types/Routes";
import { FiltersPane } from "./components/FiltersPane/FiltersPane";
import { Navbar } from "../../components/Navbar/Navbar";
import { getCategories } from "../../Requests/Category/GetCategories";

export const Home: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>();
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [inStock, setInStock] = useState(false);
  const [currentFilters, setCurrentFilters] =
    useState<Omit<GetProductsRequestParams, "token">>();

  const getProductsRequest = useOceanRequest({
    request: getProducts,
  });

  const getCategoriesRequest = useOceanRequest({
    request: getCategories,
  });

  useEffect(() => {
    getCategoriesRequest(null).then((response) => {
      setCategories(response);
      setSelectedCategories(response);
    });
  }, []);

  const fetchProducts = useCallback(
    async (params: Omit<GetProductsRequestParams, "token"> = {}) => {
      setIsLoadingProducts(true);

      return getProductsRequest(params)
        .then((response) => {
          setProducts(response.products);
        })
        .catch((err) => {
          console.error(err);
          setProducts([]);
        })
        .finally(() => {
          setIsLoadingProducts(false);
        });
    },
    [getProductsRequest, setProducts, setIsLoadingProducts]
  );

  const fetchProductsWithFilters = useCallback(
    (clearFilters: boolean = false, freeSearch: string = "") => {
      if (clearFilters) {
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setSelectedCategories(categories || []);
        setInStock(false);
        setCurrentFilters(undefined);
        return fetchProducts();
      } else {
        const filters: Omit<GetProductsRequestParams, "token"> = {
          filters: {
            search: freeSearch || undefined,
            minPrice,
            maxPrice,
            inStock: inStock || undefined,
            categories: selectedCategories.length
              ? JSON.stringify(selectedCategories.map((c) => c.name))
              : undefined,
          },
        };

        setCurrentFilters(filters);

        return fetchProducts(filters);
      }
    },
    [minPrice, maxPrice, inStock, selectedCategories, fetchProducts]
  );

  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      return;
    }

    fetchProducts();
  }, [isLoading, isAuthenticated, fetchProducts]);

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

  if (!isAuthenticated && !isLoading) {
    navigate(`/${ROUTES.LOGIN}`);
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar
        onEnterDown={(search) => {
          fetchProductsWithFilters(false, search);
        }}
      />
      <div className="flex column-gap-24 relative">
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
          setCurrentFilters={setCurrentFilters}
        />
        <div className="flex layout-column row-gap-24 overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};
