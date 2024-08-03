export const CATEGORY_NAMES = {
  ELECTRONICS: "electronics",
  CLOTHING: "clothing",
  HOME: "home",
  SPORTS: "sports",
  FOOD: "food",
  BOOKS: "books",
  TOYS: "toys",
  GAMES: "games",
  TOOLS: "tools",
} as const;

export type CategoryNames =
  (typeof CATEGORY_NAMES)[keyof typeof CATEGORY_NAMES];

export type Category = {
  _id: string;
  name: CategoryNames;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
