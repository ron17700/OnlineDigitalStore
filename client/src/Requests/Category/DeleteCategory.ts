import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type DeleteCategoryRequestParams = {
  categoryId: string;
} & BaseRequestParams;

export const deleteCategory = async (params: DeleteCategoryRequestParams) => {
  const { categoryId, token } = params;

  return baseOceanRequest({
    method: OCEAN_METHODS.DELETE,
    path: `/category/${categoryId}`,
    token: token,
  });
};
