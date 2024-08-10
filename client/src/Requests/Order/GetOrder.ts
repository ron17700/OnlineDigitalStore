import { Order } from "../../DataModel/Objects/Order";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type GetOrderRequestParams = {
  orderId: string;
} & BaseRequestParams;

export const getOrder = async (params: GetOrderRequestParams) => {
  const { token, orderId } = params;

  return baseOceanRequest<Order>({
    method: OCEAN_METHODS.GET,
    path: `/order/${orderId}`,
    token: token,
  });
};
