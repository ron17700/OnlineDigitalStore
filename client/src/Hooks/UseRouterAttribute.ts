import { useLocation, useNavigate } from "react-router-dom";
import { SidePanelTypes } from "../Types/SidePanels";
import { useEffect, useState } from "react";

export const ROUTER_PARAMS = {
  ACTIVE_SIDE_PANEL: "activeSidePanel",
} as const;

type RouterAttributes = {
  [ROUTER_PARAMS.ACTIVE_SIDE_PANEL]: SidePanelTypes;
};

type RouterAttributeParams = keyof RouterAttributes;

export const useRouterAttribute = <TParam extends RouterAttributeParams>(
  param: TParam
): RouterAttributes[TParam] | undefined => {
  const location = useLocation();
  const [value, setValue] = useState<RouterAttributes[TParam]>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setValue(params.get(param) as RouterAttributes[TParam]);
  }, [location.search, param]);

  return value;
};

export const useUpdateRouterAttribute = <
  TKeyAttribute extends RouterAttributeParams
>(
  param: TKeyAttribute,
  value: RouterAttributes[TKeyAttribute] | null
) => {
  const navigate = useNavigate();

  const updateQueryParam = () => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(param, value);

      navigate({
        search: params.toString(),
      });
    } else {
      params.delete(param);
      navigate({
        search: params.toString(),
      });
    }
  };

  return updateQueryParam;
};
