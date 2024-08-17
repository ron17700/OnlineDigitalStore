import { baseOceanRequest, OCEAN_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";
import {TotalProductsByCategory} from "../../DataModel/Objects/Analytics";

export type GetTotalProductsByCategoryRequestParams = {} & BaseRequestParams;

export const getTotalProductsByCategory = async (params: GetTotalProductsByCategoryRequestParams) => {
    const { token } = params;

    return baseOceanRequest<TotalProductsByCategory[]>({
        method: OCEAN_METHODS.GET,
        path: "/product/by-category",
        token: token,
    });
};
