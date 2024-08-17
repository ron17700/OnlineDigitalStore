import { Product } from "../../DataModel/Objects/Product";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

export type GetProductsRequestParams = {
  filters?: {
    minPrice?: number;
    maxPrice?: number;
    categoryId?: string;
    inStock?: boolean;
    sortBy?: string;
    search?: string;
  };
} & BaseRequestParams;

export const getProducts = async (params: GetProductsRequestParams) => {
  const { token, filters = {} } = params;

  return baseOceanRequest<{ products: Product[] }>({
    method: OCEAN_METHODS.GET,
    path: "/product",
    token: token,
    query: filters,
  });
};
