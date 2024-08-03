import { Cart } from "../../DataModel/Objects/Cart";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type UpdateCartRequestParams = {
  cart: Cart;
} & BaseRequestParams;

export const updateCart = async (params: UpdateCartRequestParams): Promise<Cart> => {
  const { token, cart } = params;

  return baseOceanRequest({
    method: OCEAN_METHODS.PUT,
    path: `/cart`,
    token: token,
    body: cart,
  });
};