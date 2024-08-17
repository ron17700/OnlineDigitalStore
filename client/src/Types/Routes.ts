export const ROUTES = {
  HOME: "",
  ADMIN:"admin",
  LOGIN: "login",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
