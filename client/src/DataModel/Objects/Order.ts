import { Address } from "./Address";
import { CartItem } from "./Cart";

export const ORDER_STATUSES = {
  Created: "Created",
  Processing: "Processing",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];

export type Order = {
  _id: string;
  user: string;
  address: Address | null;
  products: CartItem[];
  price: number;
  status: OrderStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
