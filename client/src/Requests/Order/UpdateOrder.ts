import { Order } from "../../DataModel/Objects/Order";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type UpdateOrderRequestParams = {
  order: Order;
} & BaseRequestParams;

export const updateOrder = async (
  params: UpdateOrderRequestParams
): Promise<Order> => {
  const { token, order } = params;

  const body: any = {
    ...order,
  };

  body.address = order.address?._id;

  return baseOceanRequest({
    method: OCEAN_METHODS.PUT,
    path: `/order/${order._id}`,
    token: token,
    body: body,
  });
};
