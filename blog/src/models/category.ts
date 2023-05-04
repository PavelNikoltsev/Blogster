export interface NewCategory {
  name?: string;
  link?: string;
  slug?: string;
}
export interface Category extends NewCategory {
  id: number;
}
const res = await fetch("http://localhost:3001/categories");
export const categories: Category[] = await res.json();
