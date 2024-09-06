import { useContext, useEffect } from "react";
import { getPermission } from "../Requests/Permission/GetPermission";
import { useOceanRequest } from "./UseOceanRequest";
import { PermissionsContext } from "../Contexts/Permissionscontext";

export const usePermissions = () => {
  const { permissions, setPermissions } = useContext(PermissionsContext);

  const getPermissionsRequest = useOceanRequest({
    request: getPermission,
  });

  useEffect(() => {
    if (!permissions) {
      getPermissionsRequest(null)
        .then((permissions) => {
          setPermissions(permissions);
        })
        .catch((error) => {
          console.error(error);
          setPermissions([]);
        });
    }
  }, []);

  return { permissions };
};

export const useHasAdminPermission = () => {
  const { permissions } = usePermissions();

  return permissions?.includes("admin");
};
