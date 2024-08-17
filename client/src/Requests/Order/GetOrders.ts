import { Order } from "../../DataModel/Objects/Order";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

export type GetOrdersRequestParams = {} & BaseRequestParams;

export const getOrders = async (params: GetOrdersRequestParams) => {
  const { token } = params;

  return baseOceanRequest<Order[]>({
    method: OCEAN_METHODS.GET,
    path: "/order",
    token: token,
  });
};
