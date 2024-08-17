import { Order } from "../../DataModel/Objects/Order";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type UpdateOrderRequestParams = {
  order: Partial<Omit<Order, "_id" | "createdAt" | "updatedAt" | "__v">>;
  orderId: string;
} & BaseRequestParams;

export const updateOrder = async (params: UpdateOrderRequestParams) => {
  const { token, order, orderId } = params;

  return baseOceanRequest<Order>({
    method: OCEAN_METHODS.PUT,
    body: order,
    path: `/order/${orderId}`,
    token: token,
  });
};
