import { Cart } from "../../DataModel/Objects/Cart";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type GetCartRequestParams = BaseRequestParams;

export const getCart = async (params: GetCartRequestParams): Promise<Cart> => {
  const { token } = params;

  return baseOceanRequest({
    method: OCEAN_METHODS.GET,
    path: `/cart`,
    token: token,
  });
};
