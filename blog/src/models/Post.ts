import type { Category } from "./Category";
import type { Comment } from "./Comment";
import type { Tag } from "./Tag";

export interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: number[] | [];
  comments: number[] | [];
  category: number;
}

const res = await fetch("http://localhost:3001/posts");
export const posts: Post[] = await res.json();
