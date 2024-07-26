export const CATEGORIES = {
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

export type Categories = (typeof CATEGORIES)[keyof typeof CATEGORIES];
