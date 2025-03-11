import type { Category } from "./Category";

export interface CategoryContextType {
  findCategories: () => Promise<Category[] | undefined>;
}
