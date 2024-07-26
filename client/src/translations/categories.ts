import { CATEGORIES, Categories } from "../types/categories";

const CATEGORIES_TRANSLATIONS_MAP: {
  [key in Categories]: string;
} = {
  [CATEGORIES.ELECTRONICS]: "Electronics",
  [CATEGORIES.CLOTHING]: "Clothing",
  [CATEGORIES.HOME]: "Home",
  [CATEGORIES.SPORTS]: "Sports",
  [CATEGORIES.FOOD]: "Food",
  [CATEGORIES.BOOKS]: "Books",
  [CATEGORIES.TOYS]: "Toys",
  [CATEGORIES.GAMES]: "Games",
  [CATEGORIES.TOOLS]: "Tools",
};

export const getCategoryTranslation = (category: Categories): string => {
  return CATEGORIES_TRANSLATIONS_MAP[category] || category;
};
