import { useAuth0 } from "@auth0/auth0-react";
import { BaseRequestParams } from "../Requests/Types/BaseRequestParams";
import { useCallback } from "react";

type UseOceanRequestParams<
  TParams extends object | null = null,
  RequestResponseType extends object | null | boolean = null,
  TFunctionParams = BaseRequestParams & TParams
> = {
  request: (params: TFunctionParams) => Promise<RequestResponseType>;
};

export const useOceanRequest = <
  TParams extends object | null = null,
  RequestResponseType extends object | null | boolean = null
>({
  request,
}: UseOceanRequestParams<TParams, RequestResponseType>) => {
  const { getAccessTokenSilently } = useAuth0();

  const wrappedRequestFunction = useCallback(async (params: TParams) => {
    return getAccessTokenSilently().then(async (token) => {
      return request({
        ...params,
        token,
      });
    });
  }, []);

  return wrappedRequestFunction;
};
