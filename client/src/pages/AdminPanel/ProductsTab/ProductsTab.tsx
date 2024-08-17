import { useEffect, useState } from "react";
import { Product } from "../../../DataModel/Objects/Product";
import { getProducts } from "../../../Requests/Product/GetProducts";
import { useAuth0 } from "@auth0/auth0-react";
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import ProductsTable from "./ProductsTable";

export const ProductsTab: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [products, setProducts] = useState<Product[]>();
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const getProductsRequest = useOceanRequest({
    request: getProducts,
  });

  const fetchProducts = () => {
    setIsLoadingProducts(true);
    getProductsRequest({})
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
  };

  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      return;
    }

    fetchProducts();
  }, [isLoading, isAuthenticated]);

  if (isLoading || isLoadingProducts) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {products && <ProductsTable data={products} onRefresh={fetchProducts} />}
    </div>
  );
};
