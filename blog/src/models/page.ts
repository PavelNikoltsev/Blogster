export interface NewPage {
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: string | "";
}
export interface Page extends NewPage {
  id: number;
  created: string;
  updated: string;
}
