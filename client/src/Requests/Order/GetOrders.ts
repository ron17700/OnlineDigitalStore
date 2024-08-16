import { Order } from "../../DataModel/Objects/Order";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type GetOrderRequestParams = BaseRequestParams;

export const getOrders = async (
  params: GetOrderRequestParams
): Promise<Order[]> => {
  const { token } = params;

  return baseOceanRequest({
    method: OCEAN_METHODS.GET,
    path: `/order`,
    token: token,
  });
};
