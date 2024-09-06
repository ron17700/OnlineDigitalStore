export const SIDE_PANELS = {
  ORDERS_AND_SHOPPING_BAG: "orders_and_shopping_bag",
  ADDRESSES: "addresses",
} as const;

export type SidePanelTypes = (typeof SIDE_PANELS)[keyof typeof SIDE_PANELS];
