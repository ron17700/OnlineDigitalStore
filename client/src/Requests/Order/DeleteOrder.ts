import { Order } from "../../DataModel/Objects/Order";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type DeleteOrderRequestParams = {
  orderId: string;
} & BaseRequestParams;

export const deleteOrder = async (params: DeleteOrderRequestParams) => {
  const { orderId, token } = params;

  return baseOceanRequest({
    method: OCEAN_METHODS.DELETE,
    path: `/order/${orderId}`,
    token: token,
  });
};
