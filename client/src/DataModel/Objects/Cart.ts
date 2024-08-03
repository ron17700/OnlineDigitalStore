import { Category } from "./Category";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  category: Category | null;
  isActive: boolean;
}

export interface ICartItem {
  quantity: number;
  product: IProduct;
}

export type Cart = {
  _id: string;
  products: ICartItem[];
  user: string;
};
