import { Address } from "../../DataModel/Objects/Address";
import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

export type GetAddressesRequestParams = {} & BaseRequestParams;

export const getAddresses = async (params: GetAddressesRequestParams) => {
  const { token } = params;

  return baseOceanRequest<Address[]>({
    method: OCEAN_METHODS.GET,
    path: "/address",
    token: token,
  });
};
