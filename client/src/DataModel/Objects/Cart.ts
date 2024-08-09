import { Product } from "./Product";

export type CartItem = {
  quantity: number;
  product: Product;
};

export type Cart = {
  _id: string;
  products: CartItem[];
  user: string;
  createdAt: string;
  updatedAt: string;
};
