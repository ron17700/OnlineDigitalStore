export const ROUTES = {
  HOME: "",
  LOGIN: "login",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
