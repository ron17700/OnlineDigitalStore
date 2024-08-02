import { Category } from "../../DataModel/Objects/Category";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type UpdateCategoryRequestParams = {
  category: Partial<Omit<Category, "_id" | "createdAt" | "updatedAt" | "__v">>;
  categoryId: string;
} & BaseRequestParams;

export const updateCategory = async (params: UpdateCategoryRequestParams) => {
  const { token, category, categoryId } = params;

  return baseOceanRequest<Category>({
    method: OCEAN_METHODS.PUT,
    body: category,
    path: `/category/${categoryId}`,
    token: token,
  });
};
