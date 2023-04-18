export interface Post {
  id: number;
  title: string;
  description: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  link: string;
  tags: string[] | string;
  category: string;
  author: string;
  created: string;
  comments: string[] | [];
}
