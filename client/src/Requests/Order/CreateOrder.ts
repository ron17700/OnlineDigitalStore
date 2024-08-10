import { Order } from "../../DataModel/Objects/Order";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type CreateOrderRequestParams = {
  order: Omit<Order, "_id" | "createdAt" | "updatedAt" | "__v">;
} & BaseRequestParams;

export const createOrder = async (params: CreateOrderRequestParams) => {
  const { token, order } = params;

  return baseOceanRequest<Order>({
    method: OCEAN_METHODS.POST,
    body: order,
    path: "/order",
    token: token,
  });
};
