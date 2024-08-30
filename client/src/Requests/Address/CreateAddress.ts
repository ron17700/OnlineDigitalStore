import { Address } from "../../DataModel/Objects/Address";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

export type AddressRequestType = Omit<
  Address,
  "_id" | "createdAt" | "updatedAt" | "__v" | "user"
>;

type CreateAddressRequestParams = {
  address: AddressRequestType;
} & BaseRequestParams;

export const createAddress = async (params: CreateAddressRequestParams) => {
  const { token, address } = params;

  return baseOceanRequest<Address>({
    method: OCEAN_METHODS.POST,
    body: address,
    path: "/address",
    token: token,
  });
};
