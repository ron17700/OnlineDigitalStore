import { Category } from "../../DataModel/Objects/Category";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type CreateCategoryRequestParams = {
  category: Omit<Category, "_id" | "createdAt" | "updatedAt" | "__v">;
} & BaseRequestParams;

export const createCategory = async (params: CreateCategoryRequestParams) => {
  const { token, category } = params;

  return baseOceanRequest<Category>({
    method: OCEAN_METHODS.POST,
    body: category,
    path: "/category",
    token: token,
  });
};
