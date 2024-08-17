export const MOCK_CATEGORY_NAMES = {
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

export type Category = {
  _id: string;
  name: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
