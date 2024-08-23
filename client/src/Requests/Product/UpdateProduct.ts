import { ProductWithCategoryID } from "../../DataModel/Objects/Product";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type UpdateProductRequestParams = {
  product: Partial<Omit<ProductWithCategoryID, "_id" | "createdAt" | "updatedAt" | "__v">>;
  productId: string;
} & BaseRequestParams;

export const updateProduct = async (params: UpdateProductRequestParams) => {
  const { token, product, productId } = params;

  return baseOceanRequest<ProductWithCategoryID>({
    method: OCEAN_METHODS.PUT,
    body: product,
    path: `/product/${productId}`,
    token: token,
  });
};
