export interface Category {
  name: string;
  link: string;
  slug: string;
}
const res = await fetch("http://localhost:3001/categories");
export const categories: Category[] = await res.json();
