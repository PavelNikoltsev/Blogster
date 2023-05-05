export interface NewCategory {
  name?: string;
  link?: string;
  slug?: string;
}
export interface Category extends NewCategory {
  id: number;
  created: string;
  updated: string;
}
