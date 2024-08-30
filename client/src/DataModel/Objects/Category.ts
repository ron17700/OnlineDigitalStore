export const MOCK_CATEGORY_NAMES = {
  ELECTRONICS: "Electronics",
  CLOTHING: "Clothing",
  HOME: "Home",
  SPORTS: "Sports",
  FOOD: "Food",
  BOOKS: "Books",
  TOYS: "Toys",
  GAMES: "Games",
  TOOLS: "Tools",
} as const;

export type Category = {
  _id: string;
  name: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
