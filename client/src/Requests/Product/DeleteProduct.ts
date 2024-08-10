import { Product } from "../../DataModel/Objects/Product";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type DeleteProductRequestParams = {
  productId: string;
} & BaseRequestParams;

export const deleteProduct = async (params: DeleteProductRequestParams) => {
  const { productId, token } = params;

  return baseOceanRequest<any>({
    method: OCEAN_METHODS.DELETE,
    path: `/product/${productId}`,
    token: token,
  });
};
