import { Category } from "../../DataModel/Objects/Category";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

export type GetCategoriesRequestParams = {} & BaseRequestParams;

export const getCategories = async (params: GetCategoriesRequestParams) => {
  const { token } = params;

  return baseOceanRequest<Category[]>({
    method: OCEAN_METHODS.GET,
    path: "/category",
    token: token,
  });
};
