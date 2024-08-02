import { useAuth0 } from "@auth0/auth0-react";
import { BaseRequestParams } from "../Requests/Types/BaseRequestParams";
import { useEffect, useState } from "react";

type UseOceanRequestParams<
  TParams extends object | null = null,
  RequestResponseType extends object | null = null,
  TFunctionParams = BaseRequestParams & TParams
> = {
  params: TParams;
  request: (params: TFunctionParams) => Promise<RequestResponseType>;
  dependencies?: any[];
};

export const useOceanRequest = <
  TParams extends object | null = null,
  RequestResponseType extends object | null = null
>(
  params: UseOceanRequestParams<TParams, RequestResponseType>
) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<RequestResponseType | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      getAccessTokenSilently().then((token) => {
        params
          .request({
            ...params.params,
            token,
          })
          .then((response) => {
            setResponse(response);
            setIsLoading(false);
          });
      });
    }
  }, [params.dependencies, isAuthenticated]);

  return { isLoading, response };
};
