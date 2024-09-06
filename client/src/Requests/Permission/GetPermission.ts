import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

export type GetPermissionRequestParams = {} & BaseRequestParams;

export const getPermission = async (params: GetPermissionRequestParams) => {
  const { token } = params;

  return baseOceanRequest<string[]>({
    method: OCEAN_METHODS.GET,
    path: "/auth/permission",
    token: token,
  });
};
