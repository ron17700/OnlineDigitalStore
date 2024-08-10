import { Product, ProductI } from "../../DataModel/Objects/Product";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type CreateProductRequestParams = {
  product: Omit<ProductI, "_id" | "createdAt" | "updatedAt" | "__v">;
} & BaseRequestParams;

export const createProduct = async (params: CreateProductRequestParams) => {
  const { token, product } = params;

  return baseOceanRequest<ProductI>({
    method: OCEAN_METHODS.POST,
    body: product,
    path: "/product",
    token: token,
  });
};
