import { createContext, Dispatch, SetStateAction } from "react";
import { Product } from "../DataModel/Objects/Product";

type ProductsContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const initialValue: ProductsContextType = {
  products: [],
  setProducts: () => {},
  isLoading: true,
  setIsLoading: () => {},
};

const ProductsContext = createContext(initialValue);

export { ProductsContext };
