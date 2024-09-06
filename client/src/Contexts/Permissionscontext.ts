import { createContext, Dispatch, SetStateAction } from "react";

type PermissionsContextType = {
  permissions: string[] | undefined;
  setPermissions: Dispatch<SetStateAction<string[] | undefined>>;
};

const initialValue: PermissionsContextType = {
  permissions: [],
  setPermissions: () => {},
};

const PermissionsContext = createContext(initialValue);

export { PermissionsContext };
