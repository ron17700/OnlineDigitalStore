import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type DeleteAddressRequestParams = {
  addressId: string;
} & BaseRequestParams;

export const deleteAddress = async (
  params: DeleteAddressRequestParams
): Promise<boolean | object | null> => {
  const { addressId, token } = params;

  return baseOceanRequest({
    method: OCEAN_METHODS.DELETE,
    path: `/address/${addressId}`,
    token: token,
  });
};
