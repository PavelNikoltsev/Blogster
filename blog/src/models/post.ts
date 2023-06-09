export interface NewPost {
  title: string;
  description: string;
  author: number;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: string | "";
  category: number | null;
}
export interface Post extends NewPost {
  id: number;
  comments: number[] | [];
  created: string;
  updated: string;
}
