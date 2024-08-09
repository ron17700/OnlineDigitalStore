import { Address } from "./Address";
import { CartItem } from "./Cart";

export enum OrderStatus {
  Created = "Created",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export type Order = {
  user: string;
  address: Address | null;
  products: CartItem[];
  price: number;
  status: OrderStatus;
  isActive: boolean;
};
