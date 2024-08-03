import { Product } from "../../DataModel/Objects/Product";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type GetProductRequestParams = {
  productId: string;
} & BaseRequestParams;

export const getProduct = async (params: GetProductRequestParams) => {
  const { token, productId } = params;

  return baseOceanRequest<Product>({
    method: OCEAN_METHODS.GET,
    path: `/product/${productId}`,
    token: token,
  });
};
