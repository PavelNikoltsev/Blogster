export interface NewPage {
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: number[] | [];
}
export interface Page extends NewPage {
  id: number;
}

const res = await fetch("http://localhost:3001/pages");
export const pages: Page[] = await res.json();
