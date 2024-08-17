import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type DeleteOrderRequestParams = {
  orderId: string;
} & BaseRequestParams;

export const deleteOrder = async (params: DeleteOrderRequestParams): Promise<boolean | object | null> => {
  const { orderId, token } = params;

  const response = await baseOceanRequest<object | null>({
    method: OCEAN_METHODS.DELETE,
    path: `/order/${orderId}`,
    token: token,
  });

  return response; // Ensure this matches the expected type
};