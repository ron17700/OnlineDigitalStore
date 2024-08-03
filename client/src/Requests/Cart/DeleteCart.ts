import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type DeleteCartRequestParams = {
  cartId: string;
} & BaseRequestParams;

export const deleteCart = async (params: DeleteCartRequestParams) => {
  const { cartId, token } = params;

  return baseOceanRequest({
    method: OCEAN_METHODS.DELETE,
    path: `/cart/${cartId}`,
    token: token,
  });
};
