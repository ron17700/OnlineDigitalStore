import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type GetCategoryRequestParams = {
  categoryId: string;
} & BaseRequestParams;

export const getCategory = async (params: GetCategoryRequestParams) => {
  const { token, categoryId } = params;

  return baseOceanRequest({
    method: OCEAN_METHODS.GET,
    path: `/category/${categoryId}`,
    token: token,
  });
};
