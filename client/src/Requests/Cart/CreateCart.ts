import { Cart } from "../../DataModel/Objects/Cart";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type CreateCartRequestParams = {
  cart: Omit<Cart, "_id" | "createdAt" | "updatedAt" | "__v">;
} & BaseRequestParams;

export const createCart = async (params: CreateCartRequestParams) => {
  const { token, cart } = params;

  return baseOceanRequest<Cart>({
    method: OCEAN_METHODS.POST,
    body: cart,
    path: "/cart",
    token: token,
  });
};
