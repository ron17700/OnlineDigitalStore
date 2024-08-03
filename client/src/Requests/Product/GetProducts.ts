import { Product } from "../../DataModel/Objects/Product";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

export type GetProductsRequestParams = {} & BaseRequestParams;

export const getProducts = async (params: GetProductsRequestParams) => {
  const { token } = params;

  return baseOceanRequest<{ products: Product[] }>({
    method: OCEAN_METHODS.GET,
    path: "/product",
    token: token,
  });
};
