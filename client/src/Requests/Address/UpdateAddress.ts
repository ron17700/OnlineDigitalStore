import { Category } from "../../DataModel/Objects/Category";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type UpdateAddressRequestParams = {
  address: Partial<Omit<Category, "_id" | "createdAt" | "updatedAt" | "__v">>;
  addressId: string;
} & BaseRequestParams;

export const updateAddress = async (params: UpdateAddressRequestParams) => {
  const { token, address, addressId } = params;

  return baseOceanRequest<Category>({
    method: OCEAN_METHODS.PUT,
    body: address,
    path: `/address/${addressId}`,
    token: token,
  });
};
