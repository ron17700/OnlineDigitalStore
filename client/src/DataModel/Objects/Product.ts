import { Category } from "./Category";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  category: Category | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ProductI = {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  category: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
