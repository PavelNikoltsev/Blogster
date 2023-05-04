export interface NewComment {
  author: string;
  content: string;
  rating: "1" | "2" | "3" | "4" | "5";
}
export interface Comment extends NewComment {
  id: number;
}

const res = await fetch("http://localhost:3001/comments");
export const comments: Comment[] = await res.json();
