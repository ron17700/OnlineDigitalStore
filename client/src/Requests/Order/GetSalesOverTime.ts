import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";
import {OrderSalesOverTime} from "../../DataModel/Objects/Analytics";

type getSalesOverTimeRequestParams = {} & BaseRequestParams;

export const getSalesOverTime = async (params: getSalesOverTimeRequestParams) => {
  const { token} = params;

  return baseOceanRequest<OrderSalesOverTime[]>({
    method: OCEAN_METHODS.GET,
    path: `/order/sales`,
    token: token,
  });
};
