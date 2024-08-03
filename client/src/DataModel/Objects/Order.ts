import { Address } from "./Address";
import { ICartItem } from "./Cart";

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
  products: ICartItem[];
  price: number;
  status: OrderStatus;
  isActive: boolean;
};
