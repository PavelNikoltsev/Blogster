export interface Comment {
  id: number;
  author: string;
  content: string;
  rating: "1" | "2" | "3" | "4" | "5";
}

const res = await fetch("http://localhost:3001/comments");
export const comments: Comment[] = await res.json();
