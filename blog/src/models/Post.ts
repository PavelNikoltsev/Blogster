export interface NewPost {
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: number[] | [];
  category: number | null;
}
export interface Post extends NewPost {
  id: number;
  comments: number[] | [];
}

const res = await fetch("http://localhost:3001/posts");
export const posts: Post[] = await res.json();
