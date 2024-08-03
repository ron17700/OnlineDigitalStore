import { BaseRequestParams } from "../Requests/Types/BaseRequestParams";

type FetchOceanRequestParams<
  TParams extends object | null = null,
  RequestResponseType extends object | null = null,
  TFunctionParams = BaseRequestParams & TParams
> = {
  params: TParams;
  request: (params: TFunctionParams) => Promise<RequestResponseType>;
  token: string;
};

export const fetchOceanRequest = async <
  TParams extends object | null = null,
  RequestResponseType extends object | null = null
>(
  params: FetchOceanRequestParams<TParams, RequestResponseType>
): Promise<{ isLoading: boolean; response: RequestResponseType | null }> => {
  try {
    const response = await params.request({
      ...params.params,
      token: params.token,
    });
    return { isLoading: false, response };
  } catch (error) {
    console.error(error);
    return { isLoading: false, response: null };
  }
};
