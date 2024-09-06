import { useCallback, useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Contexts/ProductsContext";
import { useOceanRequest } from "./UseOceanRequest";
import {
  getProducts,
  GetProductsRequestParams,
} from "../Requests/Product/GetProducts";
import { Category } from "../DataModel/Objects/Category";
import { getCategories } from "../Requests/Category/GetCategories";

export const useProducts = (shouldLoadCategories: boolean = true) => {
  const { isLoading, products, setIsLoading, setProducts } =
    useContext(ProductsContext);

  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [inStock, setInStock] = useState(false);
  const [currentFilters, setCurrentFilters] =
    useState<Omit<GetProductsRequestParams, "token">>();
  const [freeSearchFilter, setFreeSearchFilter] = useState("");

  const getProductsRequest = useOceanRequest({
    request: getProducts,
  });

  const getCategoriesRequest = useOceanRequest({
    request: getCategories,
  });

  const fetchProducts = useCallback(
    async (params: Omit<GetProductsRequestParams, "token"> = {}) => {
      setIsLoading(true);

      return getProductsRequest(params)
        .then((response) => {
          setProducts(response.products);
        })
        .catch((err) => {
          console.error(err);
          setProducts([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [getProductsRequest, setProducts, setIsLoading]
  );

  const fetchProductsWithFilters = useCallback(
    (clearFilters: boolean = false, freeSearch: string = "") => {
      if (clearFilters) {
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setSelectedCategories(categories || []);
        setInStock(false);
        setCurrentFilters(undefined);
        setFreeSearchFilter("");

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
    if (shouldLoadCategories) {
      getCategoriesRequest(null).then((response) => {
        setCategories(response);
        setSelectedCategories(response);
      });
    }
  }, [shouldLoadCategories]);

  return {
    products,
    isLoading,
    setProducts,
    fetchProductsWithFilters,
    filters: {
      minPrice,
      maxPrice,
      categories,
      selectedCategories,
      inStock,
      currentFilters,
      freeSearchFilter,
      setMinPrice,
      setMaxPrice,
      setCategories,
      setSelectedCategories,
      setInStock,
      setFreeSearchFilter,
    },
  };
};
