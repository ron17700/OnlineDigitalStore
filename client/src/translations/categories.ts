import { CategoryNames, CATEGORY_NAMES } from "../DataModel/Objects/Category";

const CATEGORIES_TRANSLATIONS_MAP: {
  [key in CategoryNames]: string;
} = {
  [CATEGORY_NAMES.ELECTRONICS]: "Electronics",
  [CATEGORY_NAMES.CLOTHING]: "Clothing",
  [CATEGORY_NAMES.HOME]: "Home",
  [CATEGORY_NAMES.SPORTS]: "Sports",
  [CATEGORY_NAMES.FOOD]: "Food",
  [CATEGORY_NAMES.BOOKS]: "Books",
  [CATEGORY_NAMES.TOYS]: "Toys",
  [CATEGORY_NAMES.GAMES]: "Games",
  [CATEGORY_NAMES.TOOLS]: "Tools",
};

export const getCategoryTranslation = (category: CategoryNames): string => {
  return CATEGORIES_TRANSLATIONS_MAP[category] || category;
};
