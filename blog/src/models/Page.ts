import type { Tag } from "./Tag";

export interface Page {
  id: number;
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: number[] | [];
}

const res = await fetch("http://localhost:3001/pages");
export const pages: Page[] = await res.json();
